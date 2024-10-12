"use client";
import {
	faBuilding,
	faChevronLeft,
	faChevronRight,
	faEllipsisH,
	faSearch,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
//import "../../../assets/styles/App.css";
//import "../../../assets/styles/interfazLider.css";
import styles1 from "../../../assets/styles/App.module.css";
import styles2 from "../../../assets/styles/interfazLider.module.css";
import { Api } from "../../../services/api";
import React from "react";

function InterfazLider() {
	// Estados para los voluntarios
	const [psicólogos, setPsicólogos] = useState([]);
	const [educadorSocial, setEducadorSocial] = useState([]);

	// Estado para el filtro de búsqueda
	const [filter, setFilter] = useState({
		name: "",
		specialization: "",
		state: "",
	});

	useEffect(() => {
		async function fetchVolunteers() {
			try {
				const response = await Api.get("/voluntarios");
				setEducadorSocial(response.data.educador);
				setPsicólogos(response.data.psicologo);
			} catch (error) {
				console.error("Error al cargar los datos de los voluntarios:", error);
			}
		}

		fetchVolunteers();
	}, []);

	// Conteo de voluntarios
	const psicólogosCount = psicólogos.length;
	const educadoresCount = educadorSocial.length;
	const total = psicólogosCount + educadoresCount;

	// Filtro de voluntarios
	const filteredPsicólogos = psicólogos.filter(
		(psicologo) =>
			psicologo.name.toLowerCase().includes(filter.name.toLowerCase()) &&
			psicologo.specialization
				.toLowerCase()
				.includes(filter.specialization.toLowerCase()) &&
			psicologo.state.toLowerCase().includes(filter.state.toLowerCase()),
	);

	const filteredEducadores = educadorSocial.filter(
		(educador) =>
			educador.name.toLowerCase().includes(filter.name.toLowerCase()) &&
			educador.state.toLowerCase().includes(filter.state.toLowerCase()),
	);

	// Paginação
	const ITEMS_PER_PAGE = 5;
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
	const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
	const currentPsicólogos = filteredPsicólogos.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);
	const currentEducadores = filteredEducadores.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(total / ITEMS_PER_PAGE); i++) {
		pageNumbers.push(i);
	}

	/*Número de páginas*/

	const maxPagesToShow = 3;
	const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
	const endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);

	return (
		<div className={styles1.App}>
			<div className={styles1["App-body"]}>
				<h2 className={styles2["titulo-table"]}>Cadastro especialidades</h2>
				<div className={styles2["cards-container"]}>
					<div className={styles2.card}>
						<FontAwesomeIcon icon={faUser} className={styles2["icon-table"]} />
						<p>{psicólogosCount}</p>
						<h3>Psicólogos</h3>
					</div>
					<div className={styles2.card}>
						<FontAwesomeIcon icon={faBuilding} className={styles2["icon-table"]} />
						<p>{educadoresCount}</p>
						<h3>Educadores</h3>
					</div>
					<div className={styles2.card}>
						<FontAwesomeIcon icon={faEllipsisH} className={styles2["icon-table"]} />
						<p>{total}</p>
						<h3>Total</h3>
					</div>
				</div>

				<h2 className={styles2["titulo-table"]}>Voluntarios</h2>

				<div className={styles2["filter-container"]}>
					<div className={styles2["input-space"]}>
						<h4>Buscar</h4>
						<div className={styles2["input-icon"]}>
							<FontAwesomeIcon icon={faSearch} className={styles2["icon-lupa"]} />
							<input
								type="text"
								placeholder="Nome"
								value={filter.name}
								onChange={(e) => setFilter({ ...filter, name: e.target.value })}
								className={styles2["input-filter"]}
							/>
						</div>
					</div>
					<div className={styles2["input-space"]}>
						<h4>Especialidade</h4>
						<input
							type="text"
							placeholder="Especialidade"
							value={filter.specialization}
							onChange={(e) =>
								setFilter({ ...filter, specialization: e.target.value })
							}
							className={styles2["input-filter"]}
						/>
					</div>
					<div className={styles2["input-space"]}>
						<h4>Estado/Cidade</h4>
						<input
							type="text"
							placeholder="Estado/Cidade"
							value={filter.state}
							onChange={(e) => setFilter({ ...filter, state: e.target.value })}
							className={styles2["input-filter"]}
						/>
					</div>
				</div>
				<h2 className={styles2["title-count"]}>
					Todos <span className={styles2["background-total"]}>{total}</span>
				</h2>
				<div className={styles2["table-container"]}>
					<table className={styles2["professional-table"]}>
						<thead>
							<tr>
								<th>Nome</th>
								<th>Día</th>
								<th>Especialidade</th>
								<th>Telefone</th>
								<th>Email</th>
								<th>Estado/Cidade</th>
							</tr>
						</thead>
						<tbody>
							{currentPsicólogos.map((psicologo) => (
								<tr key={psicologo.id}>
									<td>{psicologo.name}</td>
									<td>{psicologo.day}</td>
									<td>{psicologo.specialization}</td>
									<td>{psicologo.phoneNumber}</td>
									<td>{psicologo.email}</td>
									<td>{psicologo.state}</td>
								</tr>
							))}
							{currentEducadores.map((educador) => (
								<tr key={educador.id}>
									<td>{educador.name}</td>
									<td>{educador.day}</td>
									<td>{educador.profession}</td>
									<td>{educador.phoneNumber}</td>
									<td>{educador.email}</td>
									<td>
										{educador.state} / {educador.city}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className={styles2.pagination}>
						{/* Flecha < */}
						<button
							onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
							disabled={currentPage === 1}
						>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
						{/* Números de página */}
						{pageNumbers.slice(startPage - 1, endPage).map((number) => (
							<button
								key={number}
								onClick={() => paginate(number)}
								className={number === currentPage ? "active" : ""}
							>
								{number}
							</button>
						))}
						{/* Flecha > */}
						<button
							onClick={() =>
								setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers.length))
							}
							disabled={currentPage === pageNumbers.length}
						>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InterfazLider;
