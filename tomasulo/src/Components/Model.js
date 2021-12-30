import instructionFile from "./InstructionFile/InstructionFile.js";
import React, { useEffect, useState } from "react";
import raw from './program.txt';
import Table from './table'
import { createContext } from 'react';
import aLUReservationStations from "./ReservationStations/ALUReservationStations";
import loadBuffer from "./ReservationStations/LoadBuffer";
import storeBuffer from "./ReservationStations/StoreBuffer";

export var Context = React.createContext()

const Controller =()=> {
  const InstructionFile = new instructionFile();
  const ALUReservationStations = new aLUReservationStations();
  const StoreBuffer = new storeBuffer();
  const LoadBuffer = new loadBuffer();
  const CycleNo = 1;

  useEffect(() => {
    parser();
    console.log('I am here')
  }, []);


  const  parser = ()=>
  {
      let content = '';
      fetch(raw).then(r => r.text()).
      then(text => {
        content = text
        console.log('con',content)
      let inst = '';
      for(var i = 0;i< content.length;i++)
      {
          inst += content[i];
          if(content[i] == '\n'){
            InstructionFile.NumberOfInst ++;
              inst = inst.slice(0,inst.length-1)
              //const line = inst.split(/[ ,]+/);      
            InstructionFile.addInstruction(inst);    
            console.log('inst',inst)
            inst = '';
          }
          console.log('final:',InstructionFile)

      }

      //console.log(this.instructions.instructions)


      });
      
  }  
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
    };
    reader.readAsText(e.target.files[0])

  }  

      return (
        <>hi</>
        );

        
  }


export default Controller;