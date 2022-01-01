import instructionFile from "./InstructionFile/InstructionFile.js";
import React, { forwardRef, useEffect, useState } from "react";
import raw from './program.txt';
import Table from './table'
import { createContext } from 'react';
import aLUReservationStations from "./ReservationStations/ALUReservationStations";
import loadBuffer from "./ReservationStations/LoadBuffer";
import storeBuffer from "./ReservationStations/StoreBuffer";
import registerFile from './RegisterFile/RegisterFile';

export var Context = React.createContext()

const Controller =()=> {
  let InstructionFile = new instructionFile();
  let MulDiv = new aLUReservationStations(3);
  let AddSub = new aLUReservationStations(3);
  let StoreBuffer = new storeBuffer(3);
  let LoadBuffer = new loadBuffer(3);
  let RegisterFile = new registerFile(20);
  let CycleNo = 1;
  let InstTurn = 0;
  let LoadCycles = 2;
  let StoreCycles = 2;
  let ADDcycles = 2;
  let SUBCycles = 2;
  let MULCycles = 2;
  let DIVCycles = 2;

  

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
        //console.log('op',InstructionFile.getOperationByIndex(i));
      }
     // console.log('final:',InstructionFile)

      

      //console.log(this.instructions.instructions)


      });
      addRegisters();
      
  } 
  const addRegisters = ()=>
  {
    for(let i = 0; i< 19;i++)
    {
        RegisterFile.addRegister('F'+i,undefined,10)
    }
  }
  const isSpaceInStation = (instruction) =>  //return true if there a space in needed station so if we can Issue //usage : in Issue
  {
    const operation = InstructionFile.getOperationByInst(instruction);
    if(operation == 'L.D')
    {
      return LoadBuffer.emptyIndex() != -1
    }
    else if(operation == 'S.D')
    {
        return StoreBuffer.emptyIndex() != -1
    }
    else if(operation == 'MUL.D'  || operation == 'DIV.D')
    {
      return MulDiv.emptyIndex() != -1
    }
    else if(operation == 'ADD.D' || operation == 'SUB.D')
    {
      return AddSub.emptyIndex() != -1
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
  if(InstructionFile.NumberOfInst > InstTurn  && InstructionFile.instructions[InstTurn].Issue == -1 && isSpaceInStation(instruction) ) //check
  {
     InstructionFile.instructions[InstTurn].Issue = CycleNo;
     const operation = InstructionFile.getOperationByInst(instruction);
      InstructionFile.instructions[InstTurn].Issue = CycleNo;
      let index = -1;
      let Qj = null;
      let Qk = null;
      let Vj = null;
      let Vk = null;
      
      if(operation == 'L.D')
      {
        index = LoadBuffer.addROOM(InstructionFile.getAddress(instruction)); 
        InstructionFile.instructions[InstTurn].reservedRomm = 'L'+(index+1)
      }
      else if(operation == 'S.D')
      {
        if(isEmpty(RegisterFile.getQi(InstructionFile.getFirstSourcenByInst(instruction))))
        
          Vj =RegisterFile.getContent(InstructionFile.getFirstSourcenByInst(instruction));
        else     
          Qj = RegisterFile.getQi(InstructionFile.getFirstSourcenByInst(instruction));
        index = StoreBuffer.addROOM(LoadBuffer.getAddress(instruction),Vj,Qj); 
        InstructionFile.instructions[InstTurn].reservedRomm = 'S'+(index+1)

      } 
      else if(operation == 'MUL.D'  || operation == 'DIV.D')
      {     
        if(isEmpty(RegisterFile.getQi(InstructionFile.getFirstSourcenByInst(instruction))))
          Vj = RegisterFile.getContent(InstructionFile.getFirstSourcenByInst(instruction));
        else
          Qj = RegisterFile.getQi(InstructionFile.getFirstSourcenByInst(instruction));

        if(isEmpty(RegisterFile.getQi(InstructionFile.getSecondSourceByInst(instruction))))
          Vk = RegisterFile.getContent(InstructionFile.getSecondSourceByInst(instruction));
        else       
          Qk = RegisterFile.getQi(InstructionFile.getSecondSourceByInst(instruction));
        

        index = MulDiv.addROOM(operation.substring(0, operation.length - 2),Vj,Vk,Qj,Qk);  
        InstructionFile.instructions[InstTurn].reservedRomm = 'M'+(index+1)

      }
      else if(operation == 'ADD.D' || operation == 'SUB.D')
      {
        console.log('here')
        if(isEmpty(RegisterFile.getQi(InstructionFile.getFirstSourcenByInst(instruction)))) 
          Vj = RegisterFile.getContent(InstructionFile.getFirstSourcenByInst(instruction));
      else      
          Qj = RegisterFile.getQi(InstructionFile.getFirstSourcenByInst(instruction));
          
      if(isEmpty(RegisterFile.getQi(InstructionFile.getSecondSourceByInst(instruction))))
          Vk = RegisterFile.getContent(InstructionFile.getSecondSourceByInst(instruction));
      else
          Qk = RegisterFile.getContent(InstructionFile.getSecondSourceByInst(instruction));
      

      index = AddSub.addROOM(operation.substring(0, operation.length - 2),Vj,Vk,Qj,Qk); 
      InstructionFile.instructions[InstTurn].reservedRomm = 'A'+(index+1)
      }

      if(index != -1)
      {
        console.log('in')
         RegisterFile.setQi(InstructionFile.getDestinationByInst(instruction), InstructionFile.instructions[InstTurn].reservedRomm)
         InstTurn++;
      }
     // RegisterFile.setContent(InstructionFile.getDestinationByInst(instruction))
  }
}
const Execute = (instruction)=>
{
    const operation = InstructionFile.getOperationByInst(instruction);
    if(instruction.Issue != -1 && instruction.Execute == -1 && haveItsOperands(instruction) )
    {
        const end = -1;
        InstructionFile.instructions[instruction.index].Execute = CycleNo;
        if(operation == 'L.D')
        {
            end = CycleNo + LoadCycles - 1;
        }
        else if(operation == 'S.D')
        {
           end = CycleNo + StoreCycles - 1;
        }
        else if(operation == 'MUL.D' )
        {
           end = CycleNo + MULCycles - 1;
        }
        else if(operation == 'DIV.D')
        {
          end = CycleNo + DIVCycles - 1;
        }
        else if(operation == 'ADD.D')
        {
          end = CycleNo + ADDcycles - 1;
        }
        else if(operation == 'SUB.D')
        {
          end = CycleNo + SUBCycles - 1;
        }
        InstructionFile.instructions[instruction.index].ExecuteFinish = end;

    }
    //Calculate end now or in its cycle ???
    
    // if(instruction.Issue != -1 && instruction.Execute != -1)
    // {
    //   InstructionFile.instructions[instruction.index].ExecuteFinish = CycleNo;
    // }
}
const FinishExecute = (instruction)=>
{
        const FirstOperand;
        const SecondOperand;
        const result;
        const reservedRomm = instruction.reservedRomm;
        const place = reservedRomm.substring(1);
        const index = parseInt(place)-1;
        if(operation == 'L.D')
        {
          
        }
        else if(operation == 'S.D')
        {
           end = CycleNo + StoreCycles - 1;
        }
        else if(operation == 'MUL.D' )
        {
          FirstOperand = parseInt(MulDiv.getVj(index));
          SecondOperand = parseInt(MulDiv.getVk(index));
          result = FirstOperand * SecondOperand;

        }
        else if(operation == 'DIV.D')
        {
          FirstOperand = parseInt(MulDiv.getVj(index));
          SecondOperand = parseInt(MulDiv.getVk(index));
          result = FirstOperand / SecondOperand;        
        }
        else if(operation == 'ADD.D')
        {
          FirstOperand = parseInt(AddSub.getVj(index));
          SecondOperand = parseInt(AddSub.getVk(index));
          result = FirstOperand + SecondOperand;
        }
        else if(operation == 'SUB.D')
        {
          FirstOperand = parseInt(AddSub.getVj(index));
          SecondOperand = parseInt(AddSub.getVk(index));
          result = FirstOperand - SecondOperand;
        }
}
const Next = ()=>{
  console.log('cycle number:',CycleNo)
  console.log('InstructionFile:',InstructionFile)
  console.log('RegisterFile:',RegisterFile);
  console.log('MulDiv:',MulDiv);
  console.log('AddSub:',AddSub);
  console.log('LoadBuffer:',LoadBuffer);
  console.log('StoreBuffer:',StoreBuffer);
  const instruction = InstructionFile.instructions[InstTurn];
  console.log('InstTurn:',instruction)
  Issue(instruction);
  for(let i = 0; i < InstructionFile.NumberOfInst; i++)
  {
    Execute(instruction);
  }



  CycleNo++;
}










      return (
        <>
        <button onClick={()=>Next()}>Next</button>
        <br/>
        CycleNo :{CycleNo}
        <br/>
        InstructionFile : {InstructionFile.instructions}
        <br/>
        RegisterFile :  {RegisterFile.RegisterFile}
        <br/>
        MulDiv : {MulDiv.MulDiv}
        <br/>
        RegisterFile : {RegisterFile.RegisterFile}
        <br/>
        AddSub : {AddSub.reservationStations}
        <br/>
        LoadBuffer : {LoadBuffer.LoadBuffer}
        <br/>
        StoreBuffer : {StoreBuffer.StoreBuffer}
 
        </>
        );

        
  }


export default Controller;