CREATE TABLE PersonaTest
(
	id_p int identity(1,1) primary key,
	nombre text not null,
	domicilio text not null,
	edad int not null,
	Oper_Alta nvarchar(64) not null,
	Fecha_Alta datetime default getdate(),
	Oper_Ult_Modif nvarchar(64) not null,
	Fecha_Ult_Modif datetime default getdate(),
	Oper_Baja nvarchar(64) default null,
	Fecha_Baja datetime default null,
	Es_Cve_Estado nvarchar(4) default 'AC' references Estado(Es_Cve_Estado)
);