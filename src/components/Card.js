import React, {useState} from 'react'

const Card = ({Object, index, deleteBot}) => {

    const handleDelete = () => {
        deleteBot(index, Object.ticker)
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

        <div style={{"position": "absolute", "right" : "20px", "bottom" : "150px"}}>
            <b><i class="fas fa-trash-alt" style = {{"color" : 'red', "cursor" : "pointer"}}  onClick = {handleDelete}></i></b>
        </div>

</div>
</div>
  )
}

export default Card