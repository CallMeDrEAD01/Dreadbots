(function() {
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

    // Function to execute Taro actions on a random player
    function executeTaro() {
        if (!checkboxes["Taro"].checked) return;

        function __useTaro() {
            const { act, el156, kvt, freeze } = pla_data,
            isTaroExist = window.gxt_156;
            if (!gam_id || act || kvt || freeze || el156 >= (my_tals[26] ? 3 : 2) || !isTaroExist) return setTimeout(__useTaro, 1000);
            const randomId = __getRandomPlayerId();
            if (!randomId) return setTimeout(__useTaro, 1000);
            _GM_action('', 'ext_use', [156, randomId], event);
            setTimeout(__useTaro, 1000);
        }

        function __getRandomPlayerId() {
            const players = [...document.querySelectorAll('#upl_list li')]
                .map(e => e.id.substring(4))
                .filter(id => id !== my_id.toString());
            return players.length ? players[Math.floor(Math.random() * players.length)] : null;
        }

        setInterval(__useTaro, 500);
    }

    // Start execution loop if "Taro" is checked
    checkboxes["Taro"].addEventListener("change", function() {
        if (checkboxes["Taro"].checked) {
            executeTaro();
        }
    });
})();
