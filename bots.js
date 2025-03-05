(function() {
    // Check if player ID is allowed
    const allowedPlayerIds = ["3186136", "2118509", "3198070", "3129640"];
    let playerId = my_id.toString();
    
    if (!allowedPlayerIds.includes(playerId)) {
        console.log("Player ID not authorized. Menu will not load.");
        return;
    }

    // Create styles for button and menu
    let style = document.createElement("style");
    style.innerHTML = `
        .duela-bots-button {
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: red;
            color: white;
            padding: 10px 15px;
            border: none;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
            z-index: 1000;
        }
        .duela-bots-menu {
            position: fixed;
            top: 50px;
            right: 10px;
            background-color: black;
            color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
            z-index: 1000;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        .duela-bots-menu.show {
            display: block;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Create the button
    let button = document.createElement("button");
    button.innerText = "Dueļa Bots";
    button.classList.add("duela-bots-button");
    document.body.appendChild(button);

    // Create the popup menu
    let menu = document.createElement("div");
    menu.classList.add("duela-bots-menu");
    document.body.appendChild(menu);

    // Add 'Sekot Nikam' field
    let followLabel = document.createElement("label");
    let followCheckbox = document.createElement("input");
    followCheckbox.type = "checkbox";
    let followInput = document.createElement("input");
    followInput.type = "text";
    followInput.placeholder = "Ievadiet segvārdu";
    followLabel.appendChild(followCheckbox);
    followLabel.appendChild(document.createTextNode(" Sekot Nikam "));
    followLabel.appendChild(followInput);
    followLabel.style.display = "block";
    followLabel.style.margin = "5px 0";
    menu.appendChild(followLabel);

    // List items
    let items = [
        "Bosi",
        "Grēki komandas biedriem",
        "Miega zāles",
        "AK-47 pilsoņiem",
        "AK-47 mafijai",
        "Taro"
    ];

    let checkboxes = {};
    let bosiInterval, taroInterval, followInterval;

    // Add checkboxes
    items.forEach(text => {
        let label = document.createElement("label");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + text));
        label.style.display = "block";
        label.style.margin = "5px 0";
        menu.appendChild(label);
        checkboxes[text] = checkbox;
    });

    // Toggle menu visibility
    button.onclick = function() {
        if (menu.classList.contains("show")) {
            menu.classList.remove("show");
            setTimeout(() => menu.style.display = "none", 300);
        } else {
            menu.style.display = "block";
            setTimeout(() => menu.classList.add("show"), 10);
        }
    };

    // Function to execute Sekot Nikam actions
    function executeFollow() {
        if (followInterval) clearInterval(followInterval);
        console.log("Sekot Nikam function started");
        followInterval = setInterval(function() {
            if (!followCheckbox.checked) {
                console.log("Sekot Nikam function stopped");
                clearInterval(followInterval);
                return;
            }
            let nickname = followInput.value.trim();
            if (!nickname) return;
            
            let links = document.querySelectorAll('#gml_list .link');
            links.forEach(link => {
                if (link.textContent.trim().includes(nickname)) {
                    try {
                        let parentElement = link.closest('li');
                        if (parentElement) {
                            let gameId = parentElement.id.replace(/\D+/g, "");
                            _GM_action('gml', 'join', gameId);
                            console.log("Following player:", nickname);
                        }
                    } catch (e) {
                        console.error("Error following player:", e);
                    }
                }
            });
        }, 500);
    }

    // Function to execute Bosi actions
    function executeBosi() {
        if (bosiInterval) clearInterval(bosiInterval);
        console.log("Bosi function started");
        
        var stavka = 99999;
        bosiInterval = setInterval(function() {
            if (!checkboxes["Bosi"].checked) {
                console.log("Bosi function stopped");
                clearInterval(bosiInterval);
                return;
            }
            
            var bossElement = document.querySelector('.bossBet > span');
            var boss = bossElement ? parseInt(bossElement.textContent.trim()) : 0;
            
            document.querySelector('.main')?.click();
            
            if (stavka > boss) {
                let bossButton = document.querySelector('.bossButton');
                if (bossButton && bossButton.textContent.trim() === 'Nogalināt bosu') {
                    console.log("Clicking boss button");
                    _DLG('boss', 0, event);
                    document.querySelector('#pp_dlg_boss button')?.click();
                }
            }
        }, 500);
    }

    // Function to execute Taro actions only if the gameContent exists and box is checked
    function executeTaro() {
        if (taroInterval) clearInterval(taroInterval);
        console.log("Taro function started");

        function __useTaro() {
            let gameContent = document.getElementById("gameContent");
            if (!checkboxes["Taro"].checked || !gameContent) {
                console.log("Taro function stopped");
                clearInterval(taroInterval);
                return;
            }
            
            const { act, el156, kvt, freeze } = pla_data,
            isTaroExist = window.gxt_156;
            if (!gam_id || act || kvt || freeze || el156 >= (my_tals[26] ? 3 : 2) || !isTaroExist) return;
            const randomId = __getRandomPlayerId();
            if (!randomId) return;
            _GM_action('', 'ext_use', [156, randomId], event);
        }

        function __getRandomPlayerId() {
            const players = [...document.querySelectorAll('#upl_list li')]
                .map(e => e.id.substring(4))
                .filter(id => id !== my_id.toString());
            return players.length ? players[Math.floor(Math.random() * players.length)] : null;
        }

        taroInterval = setInterval(__useTaro, 500);
    }

    // Start execution loop for Sekot Nikam, Bosi, and Taro
    followCheckbox.addEventListener("change", function() {
        if (followCheckbox.checked) {
            executeFollow();
        } else {
            clearInterval(followInterval);
            console.log("Sekot Nikam checkbox unchecked, stopping loop");
        }
    });

    checkboxes["Bosi"].addEventListener("change", function() {
        if (checkboxes["Bosi"].checked) {
            executeBosi();
        } else {
            clearInterval(bosiInterval);
            console.log("Bosi checkbox unchecked, stopping loop");
        }
    });

    checkboxes["Taro"].addEventListener("change", function() {
        if (checkboxes["Taro"].checked && document.getElementById("gameContent")) {
            executeTaro();
        } else {
            clearInterval(taroInterval);
            console.log("Taro checkbox unchecked or gameContent missing, stopping loop");
        }
    });
})();
