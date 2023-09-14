import './style.css'

export default function CardEquipamento (props: any) {

  
    return(

<>
  <tbody>
                    <tr>
                        <td> 1 </td>
                        <td>{ props.modelo }</td>
                        <td> Seoul </td>
                        <td> 17 Dec, 2022 </td>
                        <td>
                            <p className="status delivered">1000 (Kw)</p>
                        </td>
                        <td> <strong> $128.90 </strong></td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> <img src="images/Zinzu Chan Lee.jpg" alt=""/>Zinzu Chan Lee</td>
                        <td> Seoul </td>
                        <td> 17 Dec, 2022 </td>
                        <td>
                            <p className="status delivered">1000 (Kw)</p>
                        </td>
                        <td> <strong> $128.90 </strong></td>
                    </tr>
  </tbody>
</>


  )
} 	
