let currentAudio = null;
let recordedKeys = [];
let recording = false;

function playSound(keycode) {
        document.querySelector('audio[data-key="' + keycode + '"]').play();
    document.querySelector('div[data-key="' + keycode + '"]').classList.toggle('playing');
    let audio = document.querySelector('audio[data-key="' + keycode + '"]');
    currentAudio = audio;
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
};
window.addEventListener('keydown', (event) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    playSound(event.keyCode);
  });

function recordKey(event) {
    if (recording) {
        recordedKeys.push(event.keyCode);
    }
}

function beatBox() {
    let index = 0;
    const duration = 180; // Durée entre chaque touche enregistrée

    function simulateKey(keycode) {
        return new Promise((resolve) => {
            setTimeout(() => {
                playSound(keycode);
                resolve();
            }, duration);
        });
    }

    function playBeat() {
        if (index < recordedKeys.length) {
            const keycode = recordedKeys[index];
            simulateKey(keycode).then(() => {
                index++;
                if (index === recordedKeys.length) {
                    index = 0;
                    playBeat();
                } else {
                    playBeat();
                }
            });
        } else {
            index = 0;
            playBeat();
        }
    }

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 32) {
            if (!recording) {
                recording = true;
                recordedKeys = [];
                document.addEventListener('keydown', recordKey);
            } else {
                recording = false;
                document.removeEventListener('keydown', recordKey);
                playBeat();
            }
        }
    });
}

beatBox();
// async function beatBox() {  //await au moment de l'appeler
//     const keys = recordedKeys;
    
//     function simulateKey(keycode) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//             recordedKeys.push(keycode);
//             resolve(keycode);
//           }, 1000);
//         });
//       }
    
//       function playBeat() {
//         recordedKeys.reduce((promise, keycode) => {
//           return promise.then(() => {
//             return simulateKey(keycode);
//           }).then((key) => {
//             playSound(key);
//           });
//         }, Promise.resolve()).then(() => {
//           playBeat();
//         });
//     }
// function checkNoKeysPressed() {
//     if (recordedKeys.length === 0) {
//         beatBox();
//     }
// }
// // promise
// // await
// // async









// Ajouter un événement lorsqu'aucune touche n'est pressée
// window.addEventListener('keyup', checkNoKeysPressed);

//     playBeat();
//   };
// Fonction pour enregistrer les touches pressées par l'utilisateur : version chatGPT
// function recordKeys() {
//     return new Promise((resolve) => {
//       const keys = [];
      
//       // Écouteur d'événement pour capturer les touches pressées
//       window.addEventListener('keydown', (event) => {
//         keys.push(event.key);
//       });
      
//       // Attente pendant 5 secondes
//       setTimeout(() => {
//         resolve(keys);
//       }, 5000);
//     });
//   }
  
//   // Fonction pour rejouer les touches enregistrées
//   function replayKeys(keys) {
//     return new Promise((resolve) => {
//       let index = 0;
      
//       // Fonction récursive pour rejouer les touches une par une
//       function playKey() {
//         if (index < keys.length) {
//           // Simuler la pression de la touche
//           console.log('Rejouer :', keys[index]);
          
//           // Attente de 1 seconde avant de passer à la prochaine touche
//           setTimeout(() => {
//             index++;
//             playKey();
//           }, 1000);
//         } else {
//           resolve();
//         }
//       }
      
//       playKey();
//     });
//   }
  
//   // Fonction asynchrone pour enregistrer et rejouer les touches
//   async function recordAndReplayKeys() {
//     try {
//       const keys = await recordKeys();
//       console.log('Touches enregistrées :', keys);
//       await replayKeys(keys);
//       console.log('Rejouer terminé');
//     } catch (error) {
//       console.log('Une erreur s\'est produite :', error);
//     }
//   }
  
//   // Appel de la fonction asynchrone
//   recordAndReplayKeys();






// let currentAudio = null;
// let recordedKeys = [];

// function playSound(keycode) {
//     document.querySelector('audio[data-key="' + keycode + '"]').play();
//     document.querySelector('div[data-key="' + keycode + '"]').classList.toggle('playing');
//     let audio = document.querySelector('audio[data-key="' + keycode + '"]');
//     currentAudio = audio;
// };

// window.addEventListener('keydown', (event) => {
//     if (currentAudio) {
//         currentAudio.pause();
//         currentAudio.currentTime = 0;
//     };
//     playSound(event.keyCode);
// });

// window.addEventListener('keyup', (event) => {
//     playSound(event.keyCode);
// });

// function simulateKey(keycode) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(keycode);
//         }, 1000);
//     });
// }

// async function playBeat() {
//     for (let i = 0; i < recordedKeys.length; i++) {
//         const keycode = recordedKeys[i];
//         await simulateKey(keycode);
//         playSound(keycode);
//     }
//     playBeat(); // Répéter la séquence en boucle
// }

// // Fonction pour vérifier si aucune touche n'est pressée
// function checkNoKeysPressed() {
//     if (recordedKeys.length === 0) {
//         playBeat(); // Lancer la séquence lorsque aucune touche n'est pressée
//     }
// }

// // Ajouter un événement lorsqu'aucune touche n'est pressée
// window.addEventListener('keyup', checkNoKeysPressed);
