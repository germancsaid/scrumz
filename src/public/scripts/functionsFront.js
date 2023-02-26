// ================= RELOJ Y CALENDARIO ===================//

function clockDinamic(){
    
  momentoActual = new Date()
  hora = momentoActual.getHours()
  minuto = momentoActual.getMinutes()
  segundo = momentoActual.getSeconds()

  dia = momentoActual.getDate()

  switch (new Date().getDay()) {
      case 0: diaSemana = "Domingo"; break;
      case 1: diaSemana = "Lunes"; break;
      case 2: diaSemana = "Martes"; break;
      case 3: diaSemana = "Miercoles"; break;
      case 4: diaSemana = "Jueves"; break;
      case 5: diaSemana = "Viernes"; break;
      case 6: diaSemana = "Sabado";
  }
  switch (momentoActual.getMonth()) {
      case 0: mes = "Enero"; break;
      case 1: mes = "Febrero"; break;
      case 2: mes = "Marzo"; break;
      case 3: mes = "Abril"; break;
      case 4: mes = "Mayo"; break;
      case 5: mes = "Junio"; break;
      case 6: mes = "Julio"; break;
      case 7: Mes = "Agosto"; break;
      case 8: mes = "Septiembre"; break;
      case 9: mes = "Octubre"; break;
      case 10: mes = "Noviembre"; break;
      case 11: mes = "Diciembre"; break;
  }
  ceros = ":"
  cerom = ":"
  ceroh = ""
  if (segundo < 10 || minuto < 10 || hora < 10) {
      if (segundo < 10) { ceros = ":0"}
      if (minuto < 10) { cerom = ":0"}           
      if (hora < 10) { ceroh = "0" }

      horaImprimible = ceroh + hora + cerom + minuto + ceros + segundo
      document.getElementById("clockGame").innerHTML = horaImprimible

      document.getElementById("day").innerHTML = dia
      document.getElementById("month").innerHTML = mes
      document.getElementById("weekendDay").innerHTML = diaSemana

      setTimeout("clockDinamic()",1000)
  }else{
      horaImprimible = ceroh + hora + cerom + minuto + ceros + segundo
      document.getElementById("clockGame").innerHTML = horaImprimible

      document.getElementById("day").innerHTML = dia
      document.getElementById("month").innerHTML = mes
      document.getElementById("weekendDay").innerHTML = diaSemana

      setTimeout("clockDinamic()",1000)
  }
};
