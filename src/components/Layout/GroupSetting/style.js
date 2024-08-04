import styled from 'styled-components'

export const Container = styled('div')`
    width: 103%;
    .MuiAccordion-root{
        box-shadow: none;
    }
  
    .MuiAccordionDetails-root{
        border-top: 1px solid lightgray;
    }
    
    .section {
        .section-item{
            padding: 5px;
            font-weight: 500;
            cursor: pointer;
            img{
                width: 25px;
                height: 25px;
                border-radius: 50%;
                margin-right : 10px;
            }
        }
        .section-item:hover{
            background: #d3d3d340;
            border-radius: 5px;
        }
    }

 
`