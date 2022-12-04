
let   point   = new Audio("Aim.mp3") ;
let   finish  = new Audio("GameOver.mp3") ;
let   moves   = new Audio("Move.mp3") ;

const first   = document.querySelector('.first')
const popup   = document.querySelector('.popup') ;
const put     = document.querySelectorAll('.put') ;
const turnO   = document.querySelector('.turnO') ;
const turnX   = document.querySelector('.turnX') ;
const game    = document.querySelector('.game') ;
const btnX    = document.querySelector('.btnX') ;

const restart = document.querySelector('.btnR') ;

const res  = document.querySelector('.result') ;

const p = document.querySelector('.winner') ;



PutPlayer() ;

GiveColor();


function PutPlayer() {

    Array.from( put ).map( ( e ) => {
        
        if ( e.innerText === 'WP' || e.innerText === 'BP' ) {

            e.innerHTML = `${e.innerText}<img class = 'player pawns' src = "/Images/${e.innerText}.png" alt = ""> `
            e.style.cursor = 'pointer'
        }
        else {
        
            e.innerHTML = `${e.innerText}<img class = 'player' src = "/Images/${e.innerText}.png" alt = ""> `
            e.style.cursor = 'pointer'
        }
    })
}
 

function GiveColor() {


    Array.from( put ).map( ( e ) => {
        
       
            if(  Number.parseInt( e.id / 100 ) % 2 == 0 ) {
                       
                
        if ( ( e.id ) % 2 == 0 ) { e.style.backgroundColor = 'darkorange' }

        else { e.style.backgroundColor = 'wheat' }
           
    }

            else if ( Number.parseInt( e.id / 100 ) % 2 != 0 ) {
                
        if ( ( e.id ) % 2 != 0 ) { e.style.backgroundColor = 'darkorange'}

        else { e.style.backgroundColor = 'wheat' }
            }
        })
}

let steps = 1 ;

//---------------------------------------------------------------------------------

Array.from(  put ).map( (e) => {

    e.addEventListener('click' , () => {
      
        moves.play() ;

        //--------------------------------- Empty Path ------------------------------------

        if ( e.style.backgroundColor == 'yellowgreen' && e.innerText.length == 0 ) {    steps++ ;     }

        //------------------------------ Some Player in path ------------------------------------------ 
      
        else if ( e.style.backgroundColor == 'yellowgreen' && e.innerText.length !== 0 ) {
            
            Array.from(  put ).map( ( elem ) => { 

                if ( elem.style.backgroundColor == 'lightblue' ) {    
                    
                    //  console.log ( 'elem.id ' , e.id )

                    Q1 = elem.id ;
                    Q2 = elem.innerText ;

                    document.getElementById(Q1).innerText = '' ;
                    e.innerText = Q2 ;

                    PutPlayer() ;
                    GiveColor() ;

                    steps++;
                }
            })
        }
        
        
    //-----------change Turn ---------------------------------------

    if ( steps % 2 === 0 ) {
        turnO.classList.remove('active');
        turnX.classList.add('active');

        working ('B') ;
    }

    else {

        turnX.classList.remove('active');
        turnO.classList.add('active');

        working ('W') ;
    }
    
    SameTeam () ;                  
  
    function working( curr ) {                                   // Function Take parameter who is cuur Player

        
        // ---------------------- Getting row and col from Id ---------------------------------------------

        let Id = Number.parseInt ( Number( e.id ) ) ;
        let column = Number.parseInt ( Number(e.id) % 10 ) ;  
        let temp = ( Number.parseInt ( Number(e.id) / 10 ) * 10 ) ; 

        // console.log('check')
        
        //---------------------- Each Players Steps -------------------------

        // ---------------------------------------------- Pawn  --------------------------------------------------------------

        if ( e.innerText === `${curr}P` ) {
  
    e.style.backgroundColor = 'lightblue' ;                                 
 

    if (  steps % 2 != 0  && temp < 800 ) {               

        // Boundary Conditions (i+10) || (i+10) -1 || (i+10) +1 
      
        if (document.getElementById(`${ Id + 100}`).innerText.length == 0) { document.getElementById(`${ Id + 100}`).style.backgroundColor = 'yellowgreen' }

  if ( column < 8 && document.getElementById(`${ Id + 100 + 1}`).innerText.length !== 0) { document.getElementById(`${ Id + 100 + 1}`).style.backgroundColor = 'yellowgreen' }

 if ( column > 1 && document.getElementById(`${ Id + 100 - 1}`).innerText.length !== 0) { document.getElementById(`${ Id + 100 - 1}`).style.backgroundColor = 'yellowgreen' }

     }

   
    if (  steps % 2 == 0   && temp > 100 ) {         

        // console.log(e.id , typeof e.id , row , typeof row)
        
        if (document.getElementById(`${ Id - 100 }`).innerText.length == 0 ) { document.getElementById(`${ Id - 100 }`).style.backgroundColor = 'yellowgreen' }

        if ( column < 8 && document.getElementById(`${ Id - 100 + 1 }`).innerText.length !== 0) { document.getElementById(`${ Id - 100 + 1}`).style.backgroundColor = 'yellowgreen' }

        if ( column > 1 && document.getElementById(`${ Id - 100 - 1 }`).innerText.length !== 0) { document.getElementById(`${ Id - 100 - 1 }`).style.backgroundColor = 'yellowgreen' }
     }
 }


// -------------------------------------- Rook ------------------------------------------------------------------

if (  e.innerText == `${curr}R` ) {

    e.style.backgroundColor = 'lightblue' ;
    
    // Right side movement not cross boundary
    
    for (let i = 1; i < 9; i++) {

        if ( ( Id + i * 100 ) < 900 && document.getElementById(`${ Id + i * 100 }`).innerText == 0) { document.getElementById(`${ Id + i * 100}`).style.backgroundColor = 'yellowgreen' }
        
        else if ( ( Id + i * 100 ) < 900 && document.getElementById(`${ Id + i * 100 }`).innerText !== 0) {
            document.getElementById(`${ Id + i * 100 }`).style.backgroundColor = 'yellowgreen'
            break ;
        }
    }

    //left side movement not cross boundary
    
    for (let i = 1; i < 9; i++) {

        if ( ( Id - i * 100 ) > 100 && document.getElementById(`${ Id - i * 100 }`).innerText == 0) { document.getElementById(`${ Id - i * 100 }`).style.backgroundColor = 'yellowgreen' }
      
        else if ( ( Id - i * 100 ) > 100 && document.getElementById(`${ Id - i * 100 }`).innerText !== 0) {
            document.getElementById(`${ Id - i * 100 }`).style.backgroundColor = 'yellowgreen'
            break
        }
    }

    for (let i = 1; i < 9; i++) {

        if ( ( Id + i ) < ( temp + 9) && document.getElementById(`${ Id + i }`).innerText == 0) { document.getElementById(`${ Id + i }`).style.backgroundColor = 'yellowgreen'}
        
        else if ( ( Id + i) < ( temp + 9) && document.getElementById(`${ Id + i }`).innerText !== 0) {
            document.getElementById(`${ Id + i }`).style.backgroundColor = 'yellowgreen'
            break
        }
    }

    for (let i = 1; i < 9; i++) {

        if ( ( Id - i) > ( temp ) && document.getElementById(`${ Id - i }`).innerText == 0) { document.getElementById(`${ Id - i }`).style.backgroundColor = 'yellowgreen' }
        
        else if ( ( Id - i) > ( temp ) && document.getElementById(`${ Id - i }`).innerText !== 0) {
            document.getElementById(`${ Id - i }`).style.backgroundColor = 'yellowgreen'
            break
        }
    }
}

// ---------------------------- King ---------------------------
if (  e.innerText == `${curr}Kin` ) {

    e.style.backgroundColor = 'lightblue' ;

    if ( column < 8) { document.getElementById(`${ Id + 1}`).style.backgroundColor = 'yellowgreen' }
    
    if ( column > 1) { document.getElementById(`${ Id - 1}`).style.backgroundColor = 'yellowgreen' }
    
    if ( temp < 800) { document.getElementById(`${ Id + 100}`).style.backgroundColor = 'yellowgreen' }
    
    if ( temp > 100) { document.getElementById(`${ Id - 100}`).style.backgroundColor = 'yellowgreen' }

    if ( temp > 100 && column < 8) { document.getElementById(`${ Id - 100 + 1}`).style.backgroundColor = 'yellowgreen' }
    
    if ( temp > 100 && column > 1) { document.getElementById(`${ Id - 100 - 1}`).style.backgroundColor = 'yellowgreen' }
  
    if ( temp < 800 && column < 8) {  document.getElementById(`${ Id + 100 + 1}`).style.backgroundColor = 'yellowgreen' }
   
    if ( temp < 800 && column > 1) { document.getElementById(`${ Id + 100 - 1}`).style.backgroundColor = 'yellowgreen' }
}


// ------------ Bishop ---------------------

if (  e.innerText == `${curr}Bis` ) {

    e.style.backgroundColor = 'lightblue' ;

    for (let i = 1; i < 9; i++) {
        if (i < ( 900 - temp ) / 100 && i < 9 - column && document.getElementById(`${ Id + i * 100 + i}`).innerText.length == 0) {
            document.getElementById(`${ Id + i * 100 + i}`).style.backgroundColor = 'yellowgreen'
        }
        else if (i < (900 - temp ) / 100 && i < 9 - column && document.getElementById(`${ Id + i * 100 + i}`).innerText.length !== 0) {
            document.getElementById(`${ id + i * 100 + i}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }


    for (let i = 1; i < 9; i++) {
        if ( i < temp / 100 && i < 9 - column && document.getElementById(`${ Id - i * 100 + i}`).innerText.length == 0) {
            document.getElementById(`${ Id - i * 100 + i}`).style.backgroundColor = 'yellowgreen'
        }
        else if ( i < temp / 100 && i < 9 - column && document.getElementById(`${ Id - i * 100 + i}`).innerText.length !== 0) {
            document.getElementById(`${ Id - i * 100 + i}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }


    for (let i = 1; i < 9; i++) {
        if ( i < ( 900 - temp ) / 100 && i < column && document.getElementById(`${ Id + i * 100 - i}`).innerText.length == 0) {
            document.getElementById(`${ Id + i * 100 - i}`).style.backgroundColor = 'yellowgreen'
        }
        else if (i < ( 900 - temp ) / 100 && i < column && document.getElementById(`${ Id + i * 100 - i}`).innerText.length !== 0) {
            document.getElementById(`${ Id + i * 100 - i}`).style.backgroundColor = 'yellowgreen'
            break
        }

    }


    for (let i = 1; i < 9; i++) {
        if ( i < temp / 100 && i < column && document.getElementById(`${ Id - i * 100 - i}`).innerText.length == 0) {
            document.getElementById(`${ Id - i * 100 - i}`).style.backgroundColor = 'yellowgreen'
        }
        else if ( i < temp / 100 && i < column && document.getElementById(`${ Id - i * 100 - i}`).innerText.length !== 0) {
            document.getElementById(`${ Id - i * 100 - i}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }

}


//--------------------- Knight------------------------------

if (  e.innerText == `${curr}Kni` ) {

    e.style.backgroundColor = 'lightblue' ;

    if ( column < 7 && temp < 800 ) { document.getElementById(`${ Id + 100 + 2}`).style.backgroundColor = 'yellowgreen' }
    if ( column < 7 && temp > 200 ) { document.getElementById(`${ Id - 100 + 2}`).style.backgroundColor = 'yellowgreen' }
    if ( column < 8 && temp < 700 ) { document.getElementById(`${ Id + 200 + 1}`).style.backgroundColor = 'yellowgreen' }
    if ( column > 1 && temp < 700 ) { document.getElementById(`${ Id + 200 - 1}`).style.backgroundColor = 'yellowgreen' }
    if ( column > 2 && temp < 800 ) { document.getElementById(`${ Id - 2 + 100}`).style.backgroundColor = 'yellowgreen' }
    if ( column > 2 && temp > 100 ) { document.getElementById(`${ Id - 2 - 100}`).style.backgroundColor = 'yellowgreen' }
    if ( column < 8 && temp > 200 ) { document.getElementById(`${ Id - 200 + 1}`).style.backgroundColor = 'yellowgreen' }
    if ( column > 1 && temp > 200 ) { document.getElementById(`${ Id - 200 - 1}`).style.backgroundColor = 'yellowgreen' }
 
}

//----------------- Queen -----------------------------------------------------

if (  e.innerText == `${curr}Q` ) {

    e.style.backgroundColor = 'lightblue' ;

    for (let i = 1; i < 9; i++) {

        if ( ( Id + i * 100) < 900 && document.getElementById(`${ Id + i * 100}`).innerText == 0) { document.getElementById(`${ Id + i * 100}`).style.backgroundColor = 'yellowgreen' }
     
        else if ( ( Id + i * 100) < 900 && document.getElementById(`${ Id + i * 100}`).innerText !== 0) {
            document.getElementById(`${ Id + i * 100}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }

    for (let i = 1; i < 9; i++) {

        if ( ( Id - i * 100) > 100 && document.getElementById(`${ Id - i * 100}`).innerText == 0) { document.getElementById(`${ Id - i * 100}`).style.backgroundColor = 'yellowgreen' }
        
        else if ( ( Id - i * 100) > 100 && document.getElementById(`${ Id - i * 100}`).innerText !== 0) {
            document.getElementById(`${ Id - i * 100}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }

    for (let i = 1; i < 9; i++) {

        if ( ( Id + i) < (temp + 9) && document.getElementById(`${ Id + i}`).innerText == 0) { document.getElementById(`${ Id + i}`).style.backgroundColor = 'yellowgreen' }

        else if ( ( Id + i) < (temp + 9) && document.getElementById(`${ Id + i}`).innerText !== 0) {
            document.getElementById(`${ Id + i}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }

    for (let i = 1; i < 9; i++) {

        if ( ( Id - i) > (temp) && document.getElementById(`${ Id - i}`).innerText == 0) { document.getElementById(`${ Id - i}`).style.backgroundColor = 'yellowgreen'  }
      
        else if ( ( Id - i) > (temp) && document.getElementById(`${ Id - i}`).innerText !== 0) {
            document.getElementById(`${ Id - i}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }



    for (let i = 1; i < 9; i++) {

        if (i < (900 - temp) / 100 && i < 9 - column && document.getElementById(`${ Id + i * 100 + i}`).innerText.length == 0) { document.getElementById(`${ Id + i * 100 + i}`).style.backgroundColor = 'yellowgreen' }
        
        else if (i < (900 - temp) / 100 && i < 9 - column && document.getElementById(`${ Id + i * 100 + i}`).innerText.length !== 0) {
            document.getElementById(`${ Id + i * 100 + i}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }


    for (let i = 1; i < 9; i++) {

        if (i < temp / 100 && i < 9 - column && document.getElementById(`${ Id - i * 100 + i}`).innerText.length == 0) { document.getElementById(`${ Id - i * 100 + i}`).style.backgroundColor = 'yellowgreen'}
        
        else if (i < temp / 100 && i < 9 - column && document.getElementById(`${ Id - i * 100 + i}`).innerText.length !== 0) {
            document.getElementById(`${ Id - i * 100 + i}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }


    for (let i = 1; i < 9; i++) {

        if (i < (900 - temp) / 100 && i < column && document.getElementById(`${ Id + i * 100 - i}`).innerText.length == 0) { document.getElementById(`${ Id + i * 100 - i}`).style.backgroundColor = 'yellowgreen'}

        else if (i < (900 - temp) / 100 && i < column && document.getElementById(`${ Id + i * 100 - i}`).innerText.length !== 0) {
            document.getElementById(`${ Id + i * 100 - i}`).style.backgroundColor = 'yellowgreen'
            break
        }

    }


    for (let i = 1; i < 9; i++) {
        
        if (i < temp / 100 && i < column && document.getElementById(`${ Id - i * 100 - i}`).innerText.length == 0) { document.getElementById(`${ Id - i * 100 - i}`).style.backgroundColor = 'yellowgreen' }

        else if (i < temp / 100 && i < column && document.getElementById(`${ Id - i * 100 - i}`).innerText.length !== 0) {
            document.getElementById(`${ Id - i * 100 - i}`).style.backgroundColor = 'yellowgreen'
            break
        }
    }

}


//---------------- Check If anyone win and Find winner

CountKing = 0

Array.from(  put ).map( find => {

    if ( find.innerText == 'WKin' || find.innerText == 'BKin') { CountKing += 1 }
})

if ( CountKing == 1 ) {       

      game.style.display = 'none' ;
        res.style.display = 'block';
      
        
        finish.play() ;

        if ( steps % 2 == 0) { 
            
            p.innerHTML = `<b><i>The winner is // WHITE // Player  🎉🎉😎😎</i></b>`
        }
        else if ( steps % 2 !== 0) {
            p.innerHTML = `<b><i>The winner is // BLACK // Player🎉🎉😎😎</i></b>`
        }
    

}

}       

    })      // addEvent
})           // Loop

//------ Moving the Players  -------------------------------------------------------

Array.from( put ).map( ( InitialPosition ) => { 
    
    InitialPosition.addEventListener ( 'click' , () => {
            
        if ( InitialPosition.style.backgroundColor == 'lightblue' ) {
            
        
            CurrId = InitialPosition.id ;

            CurrText = InitialPosition.innerText ;

            Array.from( put ).map( (  FinalPosition ) => {
              
                FinalPosition.addEventListener( 'click' , () => {
                    
                    if ( FinalPosition.style.backgroundColor == 'yellowgreen' && FinalPosition.innerText.length == 0 ) {
                        
                        
                        document.getElementById(CurrId).innerText = '' ;
                        FinalPosition.innerText = CurrText ;
                        
                        
                        GiveColor() ;
                        PutPlayer() ;
                        
                    }
                })
            })
        }
    } )
})

//----------- Function to Find Same Team Member -----------------------------------

function SameTeam() {

    Array.from( put ).map( ( x1 ) => {

        if ( ( x1.style.backgroundColor == 'lightblue' ) ) {

            Array.from( put ).map( ( x2 ) =>  {

                let curr1 = x1.innerText;
                let curr2 = x2.innerText ;

                curr1 = curr1[ 0 ] ;
                
                curr2 = curr2[ 0 ] ;

                if ( x2.style.backgroundColor == 'yellowgreen' && x2.innerText.length !== 0 ) {

                 

                    if (  ( Number( x2.id ) % 2 == 0 ) && curr2 == curr1 ) {  x2.style.backgroundColor = 'white' }

                    if (  ( Number( x2.id ) % 2 !== 0 ) && curr2 == curr1 ) {  x2.style.backgroundColor = 'white' }
                }

            })
        }
    } )
}

//---------------  Select 1 Player at a Time Dont Select Multiple Players ----------------

let cnt = 0 ;

Array.from( put ).map( ( onePlayer ) => {

    onePlayer.addEventListener('click' , () => {
        cnt++;

        if ( cnt % 2 == 0 && onePlayer.style.backgroundColor != 'yellowgreen') { GiveColor() }
    })
}) ; 


