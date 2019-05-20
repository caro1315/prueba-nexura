const data = [
	{
		name: "Fabiola",
		email: "prueba@gmail.com",
		sexo: "Femenino",
		area: "Ventas",
		description: "Pruebas de esta localización",
		boletin: true
	},
	{
		name: "Camilo",
		email: "prueba@gmail.com",
		sexo: "Masculino",
		area: "Calidad",
		description: "Pruebas de esta localización",
		boletin: false
	},
	{
		name: "Fabiola",
		email: "prueba@gmail.com",
		sexo: "Femenino",
		area: "Ventas",
		description: "Pruebas de esta localización",
		boletin: true
	},
	{
		name: "Camilo",
		email: "prueba@gmail.com",
		sexo: "Masculino",
		area: "Calidad",
		description: "Pruebas de esta localización",
		boletin: false
	},
	{
		name: "Fabiola",
		email: "prueba@gmail.com",
		sexo: "Femenino",
		area: "Ventas",
		description: "Pruebas de esta localización",
		boletin: true
	},
	{
		name: "Camilo",
		email: "prueba@gmail.com",
		sexo: "Masculino",
		area: "Calidad",
		description: "Pruebas de esta localización",
		boletin: false
	}
];

//Variable para saber si se edita o se agrega
let create = true;
let identificador = "";

//Funcion de inicio
$(function () {
	getData(data);
})

// Para iniciar y actualizar la data de la tabla
function getData(data) {
	$("#cuerpo").html("");
	for (var i = 0; i < data.length; i++) {
		let boletin = "No";
		if (data[i].boletin) {
			boletin = "Si";
		}
		var tr = `<tr>
          <td>`+ data[i].name + `</td>
          <td>`+ data[i].email + `</td>
          <td>`+ data[i].sexo + `</td>
          <td>`+ data[i].area + `</td>
          <td>`+ boletin + `</td>
					<td><button onclick="editRow(this)" class="btn"><i class="fas fa-edit"></i></button> <button onclick="deleteRow(this)" class="btn"><i class="fas fa-trash"></i></button></td>
        </tr>`;
		$("#cuerpo").append(tr)
	}
}


function deleteRow(r) {
	let i = r.parentNode.parentNode.rowIndex;
	document.getElementById("myTable").deleteRow(i);
};


function editRow(r) {
	create = false;
	let i = r.parentNode.parentNode.rowIndex;
	identificador = i -1;
	$("#name1").val(data[identificador].name);
	$("#email1").val(data[identificador].email);
	$("input[name='radios'][value='"+data[identificador].sexo+"']").prop('checked', true);
	$('#area1').val(data[identificador].area);
	$("#description1").val(data[identificador].description);
	$("#checkbox1").prop("checked", data[identificador].boletin);
	$("#miModal").modal();
};


$("#close").click(function () {
	$("#contact_form").find('.form-control').val('');
	$("#checkbox1").val(false);
})




//Validar los campos y rellenar la data
$("#contact_form").submit(function (e) {
	e.preventDefault();
}).validate({
	submitHandler: function (form) {
		var form_btn = $(form).find('button[type="submit"]');
		var form_result_div = '#form-result';
		var form_error_div = '#form-error';
		form_btn.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
		form_btn.before('<div id="form-error" class="alert alert-danger" role="alert" style="display: none;"></div>');
		var form_btn_old_msg = form_btn.html();
		form_btn.html(form_btn.prop('disabled', true).data("loading-text"));

		if (create) {
			var jsondata = new Object();
			jsondata.name = document.getElementById("name1").value;
			jsondata.email = document.getElementById("email1").value;
			jsondata.sexo = $('input:radio[name=radios]:checked').val()
			jsondata.area = document.getElementById("area1").value;
			jsondata.description = document.getElementById("description1").value;
			if ($('input:checkbox[name=checkbox1]:checked').val()) {
				jsondata.boletin = $('input:checkbox[name=checkbox1]:checked').val()
			} else {
				jsondata.boletin = false
			}
			data.push(jsondata);
			
		} else {
			data[identificador].name = document.getElementById("name1").value;
			data[identificador].email = document.getElementById("email1").value;
			data[identificador].sexo = $('input:radio[name=radios]:checked').val()
			data[identificador].area = document.getElementById("area1").value;
			data[identificador].description = document.getElementById("description1").value;
			if ($('input:checkbox[name=checkbox1]:checked').val()) {
					data[identificador].boletin = $('input:checkbox[name=checkbox1]:checked').val()
			} else {
					data[identificador].boletin = false
			}
		}
		getData(data);
		$(form).find('.form-control').val('');
		$('#miModal').modal('toggle');
		// $(form_result_div).html("La solicitud tuvo éxito").fadeIn('slow');
		form_btn.prop('disabled', false).html(form_btn_old_msg);
		// setTimeout(function () { $(form_result_div).fadeOut('slow') }, 3000);
		$("#checkbox1").val(false);
		create = true;

	},
	rules: {
		name1: {
			required: true,
			maxlength: 80
		},
		email1: {
			required: true,
			email: true
		},
		description1: {
			required: true,
			maxlength: 200
		},
		area1: {
			required: true,
		}
	},
	messages: {
		name1: {
			required: "Por favor ingrese nombre completo",
			maxlength: "Debe ser menor que 80 caracteres"
		},
		email1: {
			required: "Por favor ingrese el correo electronico",
			email: "Por favor ingrese un correo valido.",
		},
		description1: {
			required: "Por favor ingrese la descripción",
			maxlength: "Debe ser menor que 200 caracteres"
		},
		area1: {
			required: "Por favor ingrese el area",
		}
	}
});


