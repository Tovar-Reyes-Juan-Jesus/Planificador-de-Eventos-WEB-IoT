$(document).ready(function () {
  
  // Función para manejar el registro de usuario
  function register(nombre, apellidoPaterno, apellidoMaterno, correo, telefono, password) {
    // Crear un objeto con los datos del formulario
    var formData = {
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      correo: correo,
      telefono: telefono,
      password: password,
    };

    // Enviar los datos del formulario al servidor mediante AJAX
    $.ajax({
      type: "POST",
      url: "registro.php", // Ruta al archivo PHP que maneja el registro
      data: formData,
      success: function (response) {
        // Manejar la respuesta del servidor aquí
        console.log(response); // Solo para propósitos de demostración
        // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de éxito o redirigir al usuario a otra página
      },
      error: function (xhr, status, error) {
        // Manejar errores de AJAX aquí
        console.error(error); // Imprimir el error en la consola
      },
    });
  }


  // Manejar el envío del formulario de registro
  $("form#registro-form").submit(function (event) {
    // Evitar que el formulario se envíe de manera predeterminada
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    var nombre = $("#nombre").val();
    var apellidoPaterno = $("#apellido-paterno").val();
    var apellidoMaterno = $("#apellido-materno").val();
    var correo = $("#correo").val();
    var telefono = $("#telefono").val();
    var password = $("#password").val();

    // Llamar a la función de registro
    register(nombre, apellidoPaterno, apellidoMaterno, correo, telefono, password);
  });

  // Manejar clic en el botón de registro
  $("#btn-register").click(function () {
    // Ocultar el contenido de inicio de sesión
    $("div[data-target='Login']").hide();
    // Mostrar el formulario de registro
    $("#register-form").show();
  });
});

//Fin de la seccion de Registro

//Seccion de cerrar Sesion

// Selecciona el formulario de cierre de sesión por su ID
var logoutForm = document.getElementById("logout-form");

// Agrega un evento de escucha para el envío del formulario
logoutForm.addEventListener("submit", function(event) {
  // Evita que el formulario se envíe de forma predeterminada
  event.preventDefault();
  
  // Redirige al usuario a otro archivo HTML después de cerrar sesión
  window.location.href = "PEW.html";
});


//Fin de la seccion de cerrar sesion




//CALENDARIO

$(document).ready(function () {
  $("#calendar").fullCalendar({
    // Configuración del calendario aquí
    // Por ejemplo:
    defaultView: "month",
    events: [
      // Aquí puedes proporcionar eventos para mostrar en el calendario
    ],
  });
});

//MANEJO DE NAVEGACION

const targets = document.querySelectorAll("[data-target]");
const content = document.querySelectorAll("[data-content]");

$(document).ready(function () {
  // Ocultar todos los contenidos de las pestañas excepto el primero
  $(".content > div").not(":first").hide();

  // Manejar el clic en los elementos del menú
  $("ul.navbar-nav li").click(function () {
    var target = $(this).data("target");
    $(".content > div").hide();
    $("div[data-target='" + target + "']").show();
  });
});

targets.forEach((targert) => {
  target.addEventListener("click", () => {
    content.forEach((c) => {
      c.classList.remove("active");
    });

    const t = document.querySelector(target.dataset.target);
    t.classList.add("active");
  });
});

// Función para mostrar u ocultar la columna adicional según la pestaña seleccionada
function toggleSpecialColumn(target) {
  var specialColumn = document.querySelector(".special-column");
  var allowedTargets = [
    "RegistrarEvento",
    "Proveedores",
    "Presupuesto",
    "Informe",
  ];

  if (allowedTargets.includes(target)) {
    specialColumn.style.display = "block";
  } else {
    specialColumn.style.display = "none";
  }
}

// Evento para detectar el clic en una pestaña de navegación
document.querySelectorAll("ul.nav.navbar-nav li").forEach(function (item) {
  item.addEventListener("click", function () {
    var target = this.getAttribute("data-target");
    toggleSpecialColumn(target);
  });
});

//Seccion de Calendario

//check the console for date click event
//Fixed day highlight
//Added previous month and next month view

function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calMonthName: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentMonth = calendarControl.localDate.getMonth();
      let currentYear = calendarControl.localDate.getFullYear();
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      console.log(
        `${e.target.textContent} ${
          calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
        <div class="calendar-year-month">
        <div class="calendar-month-label"></div>
        <div>-</div>
        <div class="calendar-year-label"></div>
        </div>
        <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
        </div>
        <div class="calendar-today-date">Today: 
          ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
          ${calendarControl.localDate.getDate()}, 
          ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
          ${calendarControl.localDate.getFullYear()}
        </div>
        <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar .calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate =
        calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let todayDate = document.querySelector(".calendar .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl.navigateToCurrentMonth
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl.selectDate,
          false
        );
      }
    },
    highlightToday: function () {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [calendar.getDate() - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function (dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates")) {
          document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: function () {
      let childElemCount =
        document.querySelector(".calendar-body").childElementCount;
      //7 lines
      if (childElemCount > 42) {
        let diff = 49 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
      }
    },
    loopThroughNextDays: function (count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            ".calendar-body"
          ).innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: function () {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
  };
  calendarControl.init();
}

const calendarControl = new CalendarControl();

// Fin de la Seccion de Calendario

//Nueva seccion de Calendario

// generate events
var eventDates = {};
let day1 = formatDate(new Date(new Date().setMonth(new Date().getMonth() + 1)));
eventDates[day1] = ["Event 1, Location", "Event 2, Location 2"];
let day2 = formatDate(new Date(new Date().setDate(new Date().getDate() + 40)));
eventDates[day2] = ["Event 2, Location 3"];

// set maxDates
var maxDate = {
  1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
  2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
  3: new Date(new Date().setMonth(new Date().getMonth() + 9)),
};

var flatpickr = $("#calendar .placeholder").flatpickr({
  inline: true,
  minDate: "today",
  maxDate: maxDate[3],
  showMonths: 1,
  enable: Object.keys(eventDates),
  disableMobile: "true",
  onChange: function (date, str, inst) {
    var contents = "";
    if (date.length) {
      for (i = 0; i < eventDates[str].length; i++) {
        contents +=
          '<div class="event"><div class="date">' +
          flatpickr.formatDate(date[0], "l J F") +
          '</div><div class="location">' +
          eventDates[str][i] +
          "</div></div>";
      }
    }
    $("#calendar .calendar-events").html(contents);
  },
  locale: {
    weekdays: {
      shorthand: ["S", "M", "T", "W", "T", "F", "S"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  },
});

eventCaledarResize($(window));
$(window).on("resize", function () {
  eventCaledarResize($(this));
});

function eventCaledarResize($el) {
  var width = $el.width();
  if (flatpickr.selectedDates.length) {
    flatpickr.clear();
  }
  if (width >= 992 && flatpickr.config.showMonths !== 3) {
    flatpickr.set("showMonths", 3);
    flatpickr.set("maxDate", maxDate[3]);
  }
  if (width < 992 && width >= 768 && flatpickr.config.showMonths !== 2) {
    flatpickr.set("showMonths", 2);
    flatpickr.set("maxDate", maxDate[2]);
  }
  if (width < 768 && flatpickr.config.showMonths !== 1) {
    flatpickr.set("showMonths", 1);
    flatpickr.set("maxDate", maxDate[1]);
    $(".flatpickr-calendar").css("width", "");
  }
}

function formatDate(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1; //Month from 0 to 11
  let y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

//Cerrar seccion de Calendario

//Seccion de Registrar Evento
$(document).ready(function () {
  // Otras funciones aquí

  // Manejar clic en el botón de agregar invitado
  $("#btnAgregarInvitado").click(function () {
    $("#tablaInvitados tbody").append(
      `<tr>
              <td><input type="text" class="form-control" placeholder="Nombre" required></td>
              <td><input type="tel" class="form-control" placeholder="Teléfono" required></td>
              <td><input type="email" class="form-control" placeholder="Correo" required></td>
              <td><button type="button" class="btn btn-danger btnEliminarFila">Eliminar</button></td>
          </tr>`
    );
  });

  // Manejar clic en el botón de eliminar invitado
  $("#tablaInvitados").on("click", ".btnEliminarFila", function () {
    $(this).closest("tr").remove();
  });

  // Manejar envío del formulario de registro de evento
  $("#registroEventoForm").submit(function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    var nombreEvento = $("#nombreEvento").val();
    var fechaEvento = $("#fechaEvento").val();
    var horaEvento = $("#horaEvento").val();
    var ubicacionEvento = $("#ubicacionEvento").val();
    var tipoEvento = $("#tipoEvento").val();
    var invitacionEvento = $("#invitacionEvento").val();
    // Aquí puedes continuar con la lógica para procesar los datos del formulario
  });
});

//Fin de la Seccion de Registrar Evento

//Seccion de Proveedores
// Función para buscar proveedores
function buscarProveedores() {
  // Obtener valores de los campos de texto
  var servicio = document.getElementById("servicio").value;
  var ubicacion = document.getElementById("ubicacion").value;

  // Realizar lógica de búsqueda y mostrar los resultados en la página
}

// Función para seleccionar/deseleccionar proveedores
function toggleSeleccionado(checkbox) {
  if (checkbox.checked) {
    // Proveedor seleccionado
  } else {
    // Proveedor deseleccionado
  }
}

// Función para confirmar selección de proveedores
function confirmarSeleccion() {
  var checkboxes = document.querySelectorAll(
    '.proveedor input[type="checkbox"]'
  );
  var seleccionados = [];

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      var proveedor = checkbox.closest(".proveedor");
      var nombreProveedor = proveedor.querySelector("a").textContent;
      seleccionados.push(nombreProveedor);
    }
  });

  // Realizar alguna acción con los proveedores seleccionados
}
//Fin de la Seccion de Proveedores

//Seccion de la creacion de Nuevo Proveedor
//$(document).ready(function () {
  // Maneja el clic en el botón para mostrar el formulario de registro
  //$("#btnMostrarRegistroProveedor").click(function () {
    //$(".registro-proveedor-form").show();
  //});

  // Maneja el envío del formulario de registro de proveedor
  //$("#registroProveedor").submit(function (event) {
    //event.preventDefault();

    // Obtiene los datos del formulario
    //var nombre = $("#nombreProveedor").val();
    //var contacto = $("#contactoProveedor").val();
    //var correo = $("#correoProveedor").val();
    //var imagen = $("#imagenProveedor")[0].files[0];

    // Realiza alguna validación de datos aquí si es necesario

    // Simula el envío de datos al servidor
    //console.log("Nombre: " + nombre);
    //console.log("Contacto: " + contacto);
    //console.log("Correo: " + correo);
    //console.log("Imagen: " + imagen.name); // Muestra el nombre del archivo

    // Cierra el formulario de registro
    //$(".registro-proveedor-form").hide();

    // Limpia el formulario para futuros usos
    //$(this)[0].reset();
  //});
//});
//Fin de la Seccion de Creacion de nuevo Proveedor

//Seccion Lista de Deseos
// Manejo del formulario para agregar elementos a la lista de deseos
$("#formAgregarDeseo").submit(function (event) {
  event.preventDefault();
  var nuevoElemento = $("#elementoDeseado").val();
  $("#listaDeseos").append("<li>" + nuevoElemento + "</li>");
  // Aquí puedes agregar el código para guardar la lista en el almacenamiento local o en una base de datos
});

// Manejo de la selección de un planificador
$("#listaPlanificadores").on("click", ".btn-seleccionar", function () {
  // Aquí puedes agregar el código para seleccionar el planificador
});

// Manejo de la presentación del formulario de opinión
$("#listaPlanificadores").on("click", ".btn-opinion", function () {
  // Aquí puedes agregar el código para mostrar el formulario de opinión
});

// Manejo del formulario de opinión
$("#formularioOpinion").submit(function (event) {
  event.preventDefault();
  var calificacion = $("input[name=calificacion]:checked").val();
  var opinion = $("#opinion").val();
  // Aquí puedes agregar el código para enviar la calificación y la opinión del cliente
});

//Fin de la seccion de Lista de Deseos

//Seccion Evento Simple

// Función para mostrar el paso especificado
function mostrarPaso(numeroPaso) {
  // Ocultar todos los pasos
  $(".paso").hide();
  // Mostrar el paso especificado
  $("#paso" + numeroPaso).show();
}

// Función para avanzar al siguiente paso
function siguientePaso() {
  var pasos = document.querySelectorAll('.paso');
  var pasoActual = document.querySelector('.paso[style="display: block"]');
  var siguientePaso = pasoActual.nextElementSibling;
  var btnSiguiente = document.getElementById('btnSiguiente');
  var btnAnterior = document.getElementById('btnAnterior');

  if (siguientePaso) {
      pasoActual.style.display = 'none';
      siguientePaso.style.display = 'block';
      
      // Si llegamos al Paso 6, cambiar el texto y la función del botón "Siguiente"
      if (siguientePaso.id === 'paso6') {
          btnSiguiente.innerHTML = 'Registrar Evento';
          btnSiguiente.setAttribute('onclick', 'registrarEvento()');
      } else {
          btnSiguiente.innerHTML = 'Siguiente';
          btnSiguiente.setAttribute('onclick', 'siguientePaso()');
      }

      // Mostrar el botón "Anterior" si no estamos en el primer paso
      btnAnterior.style.display = siguientePaso.id === 'paso1' ? 'none' : 'inline-block';
  }
}

// Función para retroceder al paso anterior
function anteriorPaso() {
  // Obtener el número del paso actual
  var pasoActual = $(".paso:visible").index() + 1;
  // Mostrar el paso anterior
  mostrarPaso(pasoActual - 1);
}

// Mostrar el primer paso al cargar la página
$(document).ready(function () {
  mostrarPaso(1);
});




//Fin de la Seccion de Evento Simple




// Función para actualizar la gráfica de pastel
function actualizarGrafica() {
  let gastoTotal = calcularGastoTotal();
  let presupuestoRestante = presupuestoTotal - gastoTotal;

  let data = {
    labels: ["Presupuesto Restante", "Gasto Total"],
    datasets: [
      {
        data: [presupuestoRestante, gastoTotal],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  let options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  if (window.grafica) {
    window.grafica.destroy();
  }

  window.grafica = new Chart(ctx, {
    type: "pie",
    data: data,
    options: options,
  });
}

// Llamar a la función para actualizar la gráfica inicialmente
actualizarGrafica();

// Actualizar la gráfica cada vez que se agrega un nuevo gasto
function agregarGasto() {
  // Tu código existente para agregar un nuevo gasto

  // Después de agregar el gasto, actualiza la gráfica
  actualizarGrafica();
}

//Fin de la Seccion de Presupuesto

//Seccion de Horario

//Fin de la Seccion de Horario

//Seccion de Informe

function generarInformePDF() {
  // Crear un nuevo documento PDF
  const doc = new jsPDF();

  // Agregar contenido al PDF
  doc.text("Resumen del Evento", 10, 10);
  doc.text("Elementos Usados en el Evento:", 10, 20);
  // Aquí puedes agregar más detalles sobre los elementos utilizados en el evento

  doc.text("Registro de Invitados:", 10, 40);
  // Aquí puedes agregar detalles sobre los invitados y si aceptaron o rechazaron la invitación

  doc.text("Gasto Total del Evento:", 10, 60);
  // Aquí puedes agregar el gasto total del evento

  // Guardar el PDF
  doc.save("InformeEvento.pdf");
}

// Función para mostrar la vista previa del informe
function mostrarVistaPreviaInforme(evento) {
  const vistaPreviaInforme = document.getElementById("vistaPreviaInforme");
  const contenidoInforme = document.getElementById("contenidoInforme");

  // Verificar si hay un evento disponible
  if (evento) {
    // Mostrar la vista previa del informe
    vistaPreviaInforme.style.display = "block";
    // Actualizar el contenido del informe
    contenidoInforme.innerHTML = `
      <h3>Resumen del Evento</h3>
      <!-- Aquí puedes agregar detalles sobre el evento, como los elementos utilizados, invitados, gasto total, etc. -->
    `;
  } else {
    // No hay evento disponible, mostrar mensaje de "ningún evento disponible"
    vistaPreviaInforme.style.display = "block";
    contenidoInforme.innerHTML = "<p>Ningún evento disponible</p>";
  }
}

// Llamar a la función para mostrar la vista previa del informe
mostrarVistaPreviaInforme(null); // Pasar null si no hay ningún evento disponible

//Fin de la Seccion de Informe

//Seccion de Horario de Evento

// Función para guardar la información ingresada por el usuario
document.querySelectorAll(".guardar").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dotInfo = btn.parentElement;
    const description = dotInfo.querySelector("input").value;
    const hour = dotInfo.querySelector(".hour").textContent;
    const descriptionWrapper = document.querySelector(
      `#timeline-descriptions-wrapper p[data-description="${hour}"]`
    );
    if (descriptionWrapper) {
      descriptionWrapper.textContent = description;
    }
  });
});

//Fin de la seccion de Horario de Evento

//Seccion de Google Api

/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID =
  "842496609729-71ul9fam01mm1eev6vik0dhi7esg1qs2.apps.googleusercontent.com";
const API_KEY = "AIzaSyABk9nApE4CTl67pqXtbjmtp1Rsm0f79Is";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("authorize_button").style.visibility = "hidden";
document.getElementById("signout_button").style.visibility = "hidden";

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("authorize_button").style.visibility = "visible";
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    document.getElementById("signout_button").style.visibility = "visible";
    document.getElementById("authorize_button").innerText = "Refresh";
    await listUpcomingEvents();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken("");
    document.getElementById("content").innerText = "";
    document.getElementById("authorize_button").innerText = "Authorize";
    document.getElementById("signout_button").style.visibility = "hidden";
  }
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById("content").innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById("content").innerText = "No events found.";
    return;
  }
  // Flatten to string to display
  const output = events.reduce(
    (str, event) =>
      `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
    "Events:\n"
  );
  document.getElementById("content").innerText = output;
}

//Fin de la seccion de Google Api

// Seccion de ADDEVENTO

const addEvent = () => {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const date = document.getElementById("date").value;
  const start = document.getElementById("st").value;
  const end = document.getElementById("et").value;

  const startTime = new Date(date + "," + start).toISOString();
  const endTime = new Date(date + "," + end).toISOString();

  var event = {
    summary: title,
    location: "Google Meet",
    description: desc,
    start: {
      dateTime: startTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [{ email: "abc@google.com" }, { email: "xyz@google.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  console.log(event);
  var request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  request.execute(function (event) {
    console.log(event.htmlLink);
  });
};

// Fin de la Seccion de ADDEVENTO


//seccion presupuesto

// Función para actualizar el total del presupuesto y la gráfica de pastel
function actualizarDatos() {
  // Actualiza el total del presupuesto
  fetch('obtener_total.php')
    .then(response => response.text())
    .then(total => {
      document.getElementById('totalAmount').textContent = '$' + total;
    })
    .catch(error => console.error('Error:', error));

  // Actualiza la gráfica de pastel (puedes implementar esta parte si deseas)
}

// Agrega un evento de envío al formulario para manejar la actualización después de agregar un gasto
document.getElementById('formularioGasto').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario predeterminado

  // Realiza la solicitud al archivo PHP para procesar el gasto y actualizar los datos
  fetch('presupuesto.php', {
    method: 'POST',
    body: new FormData(this)
  })
  .then(response => response.text())
  .then(total => {
    // Actualiza los datos después de agregar el gasto
    actualizarDatos();
  })
  .catch(error => console.error('Error:', error));
});


//fin seccion presupuesto


// Seccion Horarios

function guardarEvento(id) {
  var texto = document.getElementById(id).value;

  // Envía los datos al servidor utilizando AJAX
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "guardar_evento.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText); // Respuesta del servidor
      }
  };
  xhr.send("texto=" + encodeURIComponent(texto));
}


// Fin Seccion Horarios