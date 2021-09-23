CREATE OR ALTER  PROC dbo.findAllPersonaTest
as
	select 
	id_p as id,
	nombre as nombre,
	domicilio as domicilio,
	edad as edad,
	fecha_Alta as fechaAlta
	from PersonaTest where Es_Cve_Estado = 'AC';
go
