// ================= RELOJ Y CALENDARIO ===================//
/*
function clockDinamic(){
  
  let time = new Date();
  let hora = time.getHours()
  let minuto = time.getMinutes()
  let segundo = time.getSeconds()

  ceros = ":"
  cerom = ":"
  ceroh = ""

  if (segundo < 10 || minuto < 10 || hora < 10) {
      if (segundo < 10) { ceros = ":0"}
      if (minuto < 10) { cerom = ":0"}           
      if (hora < 10) { ceroh = "0" }

      horaImprimible = ceroh + hora + cerom + minuto + ceros + segundo
      document.getElementById("clockGame").innerHTML = horaImprimible

      setTimeout(clockDinamic, 1000);
  }else{
      horaImprimible = ceroh + hora + cerom + minuto + ceros + segundo
      document.getElementById("clockGame").innerHTML = horaImprimible

          setTimeout(clockDinamic, 1000);
      }
  };*/

function modeDarkTheme(){
    document.getElementById("modeDarkTheme").href = "styles/darkStyles.css";
    document.getElementById("modeLightTheme").href = "";
    }

function modeLightTheme(){
    document.getElementById("modeDarkTheme").href = "";
    document.getElementById("modeLightTheme").href = "styles/generalStyles.css";
};