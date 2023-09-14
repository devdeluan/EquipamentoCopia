import CardEquipamento from "../../components/CardEquip";
import api from "../../utils/api";
import { useEffect, useState } from "react"
import './style.css'
import search from '../../assets/img/search.png'
import pdf from '../../assets/img/pdf.png'
import json from '../../assets/img/json.png'
import csv from '../../assets/img/csv.png'
import excel from '../../assets/img/excel.png'


export default Equipamento;   

function Equipamento() {
  const [equip, setEquip] = useState<any[]>([])



  //state filtros com os filtros definidos
  const [filtros, setFiltros] = useState<string[]>(
    [
      "ID",
      "MODELO",
      "FABRICANTE",
      'DATA',
      "CONSUMO",
      'VALOR'
    ]);
    
  const [select, setSelect] = useState<string>(""); // state que contém a opção de filtro selecionado pelo usuário

  const [filtroDigitado, setfiltroDigitado] = useState<string>("");

  const [listaBuscaFiltrado, setlistaBuscaFiltrado] = useState<any[]>(equip);

  useEffect(() => {
    document.title = "Lista de Equipamentos"

    listarEquipamentos()

  }, [])

  function buscarPor(event: any) {
    event.preventDefault();
    
    let equipFiltrados = [];

    if (select == 'ID') {
        equipFiltrados = equip.filter((eq: any) => eq.id.toString().includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'MODELO') {
      equipFiltrados = equip.filter((eq: any) => eq.modelo.includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'FABRICANTE') {
      equipFiltrados = equip.filter((eq: any) => eq.fabricante.includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'DATA') {
      equipFiltrados = equip.filter((eq: any) => eq.data.includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'CONSUMO') {
      equipFiltrados = equip.filter((eq: any) => eq.consumo.includes(filtroDigitado.toLocaleUpperCase()))
    } 
    else if (select == 'VALOR') {
      equipFiltrados = equip.filter((eq: any) => eq.valor.includes(filtroDigitado.toLocaleUpperCase()))
    }

    if (equipFiltrados.length === 0) {
      alert("Nenhum resultado encontrado!!")
    }
 
    else {
      setlistaBuscaFiltrado(equipFiltrados)
    }
  }


  function retornoEquipGeral(event: any) {
    if (event.target.value === "") {
      setlistaBuscaFiltrado(equip)
    }
    setfiltroDigitado(event.target.value)
  }

  function listarEquipamentos() {
    api.get('users').then((resposta: any) => {
      console.log(resposta.data);
      setEquip(resposta.data)
    })
  }

  function alternarCoresTabela() {
    let linhas = document.getElementsByTagName("tr"); // Obtém todas as linhas da tabela
  
    for (let i = 0; i < linhas.length; i++) {
      if (i % 2 === 0) { // Se o índice da linha for par
        linhas[i].style.backgroundColor = "#dceee8 "; // Define a cor de fundo como branco
      } else { // Se o índice da linha for ímpar
        linhas[i].style.backgroundColor = "#01b574"; // Define a cor de fundo como verde
      }
  
      // Verifica se a linha possui a classe "tabelaEquip"
      if (linhas[i].classList.contains("tabelaEquip")) {
        linhas[i].style.backgroundColor = "white"; // usa a cor desejada
      }
    }
  }
  
  alternarCoresTabela();


  return (
    <>
<form method="post" onSubmit={buscarPor}>
<main className="table">
  <section className="table__header">
    <h1>Lista de equipamentos</h1>
    <select defaultValue={"DEFAULT"} name="" id="cad_select_skill" onChange={(e) => setSelect(e.target.value)}>
      <option selected value="DEFAULT" disabled>Selecione</option>
      {
                filtros.map((equip: any, index: number) => {
                  return <option key={index} value={equip}>{equip}</option>
                })
              }
    </select>
    <div className="input-group">
      <input type="search" placeholder="Procurar " />
     <button type= 'submit' ><img src={search} alt="" /></button> 
    </div>
    <div className="export__file">
      <label
        htmlFor="export-file"
        className="export__file-btn"
        title="Export File"
      />
      <input type="checkbox" id="export-file" />
      <div className="export__file-options">
        <label>Export As &nbsp; ➜</label>
        <label htmlFor="export-file" id="toPDF">
          PDF <img src={pdf} alt="" />
        </label>
        <label htmlFor="export-file" id="toJSON">
          JSON <img src={json} alt="" />
        </label>
        <label htmlFor="export-file" id="toCSV">
          CSV <img src={csv} alt="" />
        </label>
        <label htmlFor="export-file" id="toEXCEL">
          EXCEL <img src={excel} alt="" />
        </label>
      </div>
    </div>
  </section>
  <section className="table__body">
    <table>
      <thead>
        <tr>
          <th>
            {" "}
            Id <span className="icon-arrow">↑</span>
          </th>
          <th>
            {" "}
            Modelo <span className="icon-arrow">↑</span>
          </th>
          <th>
            {" "}
            Fabricante <span className="icon-arrow">↑</span>
          </th>
          <th>
            {" "}
            Data <span className="icon-arrow">↑</span>
          </th>
          <th>
            {" "}
            Consumo <span className="icon-arrow">↑</span>
          </th>
          <th>
            {" "}
            Valor <span className="icon-arrow">↑</span>
          </th>
        </tr>
      </thead>

        <CardEquipamento/>

    </table>
    
    </section>
  </main>
</form>
    </>
  )
}

