import React, {useState} from 'react'
import EditBot from './popupmodal/EditBot'

const Card = ({Object, index, deleteBot, updateListArray}) => {

    const [modal, setModal] = useState(false);

    const handleDelete = () => {
        deleteBot(index, Object.ticker)
    }

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }


    
    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

  return (
    <div class = "card-wrapper mr-5">
    <div class = "card-top" style={{"background-color": colors[index%5].primaryColor}}></div>
    
    <div class = "task-holder">
        <span class = "card-header" style={{"background-color": colors[index%5].secondaryColor, "border-radius": "10px"}}>{Object.ticker}</span>
        <span className = "mt-3">Stop Loss: <b>{Object.StopLoss}</b></span>
        <span className = "mt-3">Take Profit: <b>{Object.TakeProfit}</b></span>
        <span className = "mt-3">Investment: <b>{Object.AmountToBeInvested}</b></span>

        <div className='delIcom'>
            <b>
            <i class = "far fa-edit mr-3" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer", marginRight:"5px"}} onClick = {() => setModal(true)}></i>
            <i class="fas fa-trash-alt" style = {{"color" : 'red', "cursor" : "pointer"}}  onClick = {handleDelete}></i>
            </b>
        </div>

</div>
<EditBot modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {Object}/>
</div>
  )
}

export default Card