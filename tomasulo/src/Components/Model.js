import instructionFile from "./InstructionFile/InstructionFile.js";
import React, { useEffect, useState } from "react";
import raw from './program.txt';
import Table from './table'
import { createContext } from 'react';
import aLUReservationStations from "./ReservationStations/ALUReservationStations";
import loadBuffer from "./ReservationStations/LoadBuffer";
import storeBuffer from "./ReservationStations/StoreBuffer";
import registerFile from './RegisterFile/RegisterFile';

export var Context = React.createContext()

const Controller =()=> {
  const InstructionFile = new instructionFile();
  const MulDiv = new aLUReservationStations();
  const AddSub = new aLUReservationStations();
  const StoreBuffer = new storeBuffer();
  const LoadBuffer = new loadBuffer();
  const RegisterFile = new registerFile();
  const CycleNo = 0;
  const InstTurn = 1;
  

  useEffect(() => {
    parser();
    console.log('I am here')
  }, []);


  const  parser = ()=>   //usage : Instruction Table
  {
      let content = '';
      fetch(raw).then(r => r.text()).
      then(text => {
        content = text
       // console.log('con',content)
      let inst = '';
      for(var i = 0;i< content.length;i++)
      {
          inst += content[i];
          if(content[i] == '\n'){
            InstructionFile.NumberOfInst ++;
              inst = inst.slice(0,inst.length-1)
              //const line = inst.split(/[ ,]+/);      
            InstructionFile.addInstruction(inst); 
           // console.log('inst',inst)
            inst = '';
          }
         // console.log('final:',InstructionFile)

      }
      for(let i = 0;i<InstructionFile.instructions.length; i++)
      {
        console.log('op',InstructionFile.getOperationByIndex(i));
      }
      console.log('final:',InstructionFile)

      

      //console.log(this.instructions.instructions)


      });
      
  } 
  
  const isSpaceInStation = (instruction) =>  //return true if there a space in needed station so if we can Issue //usage : in Issue
  {
    const operation = InstructionFile.getOperationByInst(instruction);
    if(operation == 'L.D')
    {
        return true;
    }
    else if(operation == 'S.D')
    {
        return StoreBuffer.emptyIndex != -1
    }
    else if(operation == 'MUL.D'  || operation == 'DIV.D')
    {
      return MulDiv.emptyIndex != -1

    }
    else if(operation == 'ADD.D' || operation == 'SUB.D')
    {
      return AddSub.emptyIndex != -1
    }
  

  }

  const haveItsOperands = (instruction) =>  //check if there operands to begin execute //usage : in execute
  {
      const flag = false;
  
      const operation = InstructionFile.getOperationByInst(instruction);
     
          const reservedRomm = instruction.reservedRomm;
          const place = reservedRomm.substring(1);
          const index = parseInt(place)-1;
          if(operation == 'L.D')
          {
              flag =  true;
          }
          else if(operation == 'S.D')
          {
              flag = StoreBuffer.getQ(index) == '';
          }
          else if(operation == 'MUL.D'  || operation == 'DIV.D')
          {
              flag = MulDiv.getQj(index) == '' &&  MulDiv.getQk(index) == '';
          }
          else if(operation == 'ADD.D' || operation == 'SUB.D')
          {
              flag = AddSub.getQj(index) == '' &&  AddSub.getQk(index) == '';
          }

          return flag;

  }
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
    };
    reader.readAsText(e.target.files[0])

  }  
  const isEmpty = (word)=>{
      if(word == null || word == '' || word == ' ' || word == undefined)
        return true;
      else
        return false;
  }
const Issue = (instruction)=>
{
  InstructionFile.instructions[InstTurn].
  if(isSpaceInStation(instruction))
  {
      const operation = InstructionFile.getOperationByInst(instruction);
      InstructionFile.instructions[InstTurn].Issue = CycleNo;
      const index = -1;
      const Qj = null;
      const Qk = null;
      const Vj = null;
      const Vk = null;
      
      if(operation == 'L.D')
      {
        index = LoadBuffer.addROOM(LoadBuffer.getAddress(instruction)); 
      }
      else if(operation == 'S.D')
      {
        if(isEmpty(RegisterFile.getContent(InstructionFile.getFirstSourcenByInst(instruction))))
          Vj = InstructionFile.getFirstSourcenByInst(instruction);
        else
          Qj = InstructionFile.getFirstSourcenByInst(instruction);
        index = StoreBuffer.addROOM(LoadBuffer.getAddress(instruction),Vj,Qj); 
      }
      else if(operation == 'MUL.D'  || operation == 'DIV.D')
      {     
        if(isEmpty(RegisterFile.getContent(InstructionFile.getFirstSourcenByInst(instruction))))
          Vj = InstructionFile.getFirstSourcenByInst(instruction);
        else
          Qj = InstructionFile.getFirstSourcenByInst(instruction);

        if(isEmpty(RegisterFile.getContent(InstructionFile.getSecondSourceByInst(instruction))))
          Vk = InstructionFile.getFirstSourcenByInst(instruction);
        else
          Qk = InstructionFile.getFirstSourcenByInst(instruction);
        

        index = MulDiv.addROOM(operation,Vj,Vk,Qj,Qk);  
      }
      else if(operation == 'ADD.D' || operation == 'SUB.D')
      {
        if(isEmpty(RegisterFile.getContent(InstructionFile.getFirstSourcenByInst(instruction))))
        Vj = InstructionFile.getFirstSourcenByInst(instruction);
      else
        Qj = InstructionFile.getFirstSourcenByInst(instruction);

      if(isEmpty(RegisterFile.getContent(InstructionFile.getSecondSourceByInst(instruction))))
        Vk = InstructionFile.getFirstSourcenByInst(instruction);
      else
        Qk = InstructionFile.getFirstSourcenByInst(instruction);
      

      index = AddSub.addROOM(operation,Vj,Vk,Qj,Qk); 
      }

      if(index != -1)
      {
         InstTurn++;
      }
      RegisterFile.setContent(InstructionFile.getDestinationByInst(instruction))
  }
}
const Next = ()=>{
  CycleNo++;
  const instruction = InstructionFile.instructions[InstTurn].instruction;
  Issue(instruction);


  
 

  
}










      return (
        <>hi</>
        );

        
  }


export default Controller;