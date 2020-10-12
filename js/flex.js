   let isCheck = { isFlex: true };
      let flexDisplay = ["flex"];
      let flexDirection = ["row", "row-reverse", "column", "column-reverse"];
      let justifyContent = [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ];
      let alignItems = [
        "flex-start",
        "flex-end",
        "center",
        "baseline",
        "stretch",
      ];
      let flexWrap = ["nowrap", "wrap", "wrap-reverse"];
      let alignContent = ["flex-start", "flex-end", "center", "stretch"];
      let alignSelfArr = [
        "flex-start",
        "auto",
        "baseline",
        "center",
        "flex-end",
        "stretch",
        "inherit",
        "initial",
        "unset",
      ];
      
      let querySelectorDiv = document.querySelectorAll('div');
      let tempGeneral = searchGeneralDiv(querySelectorDiv);  
      let querySelectorContainer = querySelectorDiv[tempGeneral].children[1]; 
      let querySelectorFirstButton = querySelectorDiv[tempGeneral].children[2].children[1]; 
      let querySelectorLeftContainer = querySelectorDiv[tempGeneral].children[0].children[1]; 

      renderButtonFlex("flex", flexDisplay, "flexOn");
      renderButtonFlex("flex-direction",flexDirection,"toApplyStyleOn");
      renderButtonFlex("justify-content",justifyContent,"toApplyStyleOn");
      renderButtonFlex("align-items", alignItems, "toApplyStyleOn");
      renderButtonFlex("flex-wrap", flexWrap, "toApplyStyleOn");
      renderButtonFlex("align-content", alignContent, "toApplyStyleOn");
      renderButtonFlex("align-self", alignSelfArr, "alignSelfOn","grow1");
      renderHTML(arrNew(querySelectorContainer.children, 'orderOn', 'order у item').join(""),"order");
      renderHTML(arrNew(querySelectorContainer.children, 'flexGrowOn', 'flex-grow у item').join(""),"flex-grow");

      function searchGeneralDiv(x) {
          for (let i = 0; i < x.length; i++) {
            if(x[i].id == 'general') {
              return i;
            }
          }
      }

      function renderButtonFlex(renderFlexId, property, fnOn, ...args) {
        let temp = [];
        temp = property.map((e, i) => {
          if (renderFlexId == "align-self") {
            return `<button onclick="${fnOn}('${e}','${args[0]}','${renderFlexId}')">${e}</button>`;
          } 
          return `<button onclick="${fnOn}('${renderFlexId}','${renderFlexId}','${e}'${args[0] != undefined ? args[0] : ''})">${e}</button>`;
          // return `<button onclick="${fnOn}('${e}'${args[0] != undefined? args[0] : ''})">${e}</button>`;
        });
        return renderHTML(temp.join(""), `${renderFlexId}-button`);
      }

      function show(id, opac) {
        document.getElementById(id).style.opacity = opac;
        if (opac == "1") {
          document.getElementById(id).style.visibility = "visible";
          document.getElementById(id).style.display = "block";
        } else {
          document.getElementById(id).style.visibility = "hidden";
          document.getElementById(id).style.display = "none";
        }
      }
      
      function isCheckFlex() {
        if (querySelectorContainer.style.display == "") {
          document.getElementById("flex").style.color = "red";
          alert('Установите свойство "display: flex;", для id="container"');
          querySelectorFirstButton.children[0].style.border = '2px solid red';
          show("flex", 1);
          return false;
        }
        document.getElementById("flex").style.color = "";
        return true;
      }

      function flexOn() {
        show("flex", 1);
        querySelectorContainer.style.width = "79%";
        document.getElementById("flex").style.color = "";
        querySelectorFirstButton.children[0].style.border = '1px solid yellowgreen';

        if (!isCheck.isFlex) {
          document.getElementById("container").style.display = "";
          querySelectorLeftContainer.innerHTML = `<b>display: '';</b><br/>`;
          isCheck.isFlex = !isCheck.isFlex;
        } else {
          document.getElementById("container").style.display = "flex";
          renderHTML(`<b>display: flex;</b><br/>`,"flex");
          isCheck.isFlex = !isCheck.isFlex;
        }
      }

      function toApplyStyleOn(style, id, property) {
        if (isCheckFlex()) {
          show(id, "1");
          querySelectorContainer.style.width = "79%";
          
          document.getElementById("container").style[style] = property;
          renderHTML(`<b>${id}: ${property};</b><br/>`,id);

          if (style == "flex-wrap" || style == "align-content") {
            querySelectorContainer.style.width = "30%";
          }
          if (style == "align-items" && property == "stretch") {
            for (const iterator of querySelectorContainer.children) {
                iterator.className = "item-stretch";
                show(`${style}-stretch`, "1");
                document.getElementById(
                  `${style}-stretch`
                ).innerHTML = `<b>width: 50px;<br /> height: ' ';</b><br/>`;
              }
          }
        }
      }
 
      function itemsStyleDefault() {
        for (let i = 0; i < querySelectorContainer.children.length;i++) {
          querySelectorContainer.children[i].className = "item";
          show("align-items-stretch", "0");
        }
      }

      function arrNew(ar, fnOn, text) {
        let temp =[];
        for (let i = 0; i < ar.length;i++) {
          temp.push(`
          <input type="text" value="${ar.length-i}" id="fg${i + 1}" class="input-order">
          <button onclick="${fnOn}(document.getElementById('fg${i + 1}').value,'grow${i + 1}')">${text} ${i + 1}</button><br/>`);
          querySelectorContainer.children[i].id = "grow" + (i + 1);
        }
        return temp;
      }
      
      function renderHTML(html, id) {
        document.getElementById(id).innerHTML = html;
      }

      function orderOn(fg, grow) {
        document.getElementById(grow).style.order = fg;
      }
      
      function flexGrowOn(fg, grow) {
        document.getElementById(grow).style.flexGrow = fg;
      }

      function alignSelfOn(as, grow, style) {
        show(style, 1);
        document.getElementById(grow).style[style] = as;
        renderHTML(`<b>${style}: ${as};</b><br/>`, style);
      }
    