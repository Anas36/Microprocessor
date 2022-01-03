import instructionFile from "./InstructionFile/InstructionFile.js";
import React, { forwardRef, useEffect, useState } from "react";
import raw from './program.txt';
import Table from './table'
import { createContext } from 'react';
import aLUReservationStations from "./ReservationStations/ALUReservationStations";
import loadBuffer from "./ReservationStations/LoadBuffer";
import storeBuffer from "./ReservationStations/StoreBuffer";
import registerFile from './RegisterFile/RegisterFile';
import memoryFile  from "./Memory/MemoryFile.js";

export var Context = React.createContext()

const Controller =()=> {
  let InstructionFile = new instructionFile();
  let MulDiv = new aLUReservationStations(3);
  let AddSub = new aLUReservationStations(3);
  let StoreBuffer = new storeBuffer(3);
  let LoadBuffer = new loadBuffer(3);
  let RegisterFile = new registerFile(20);
  let MemoryFile  =new memoryFile(500);
  let CycleNo = 1;
  let InstTurn = 0;
  let LoadCycles = 2;
  let StoreCycles = 2;
  let ADDcycles = 2;
  let SUBCycles = 2;
  let MULCycles = 2;
  let DIVCycles = 2;
  let bus = new Array();

  

  useEffect(() => {
    parser();
    console.log('I am here')
  }, []);


  const  parser = ()=>   //usage : Instruction Table
  {
      let content = '';
      fetch(raw).then(r => r.text()).
      then(text => {
        content = text+'\n'
        console.log('con',content)
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
      addMemoryWords();
  } 
  const addRegisters = ()=>
  {
    for(let i = 0; i< RegisterFile.size;i++)
    {
        RegisterFile.addRegister('F'+i,undefined,10*i)
    }
  }
  const addMemoryWords =()=>
  {
    for(let i = 0;i < MemoryFile.size;i++)
    {
        MemoryFile.addWord(i,Math.floor(Math.random() *  MemoryFile.size +1)+100);  
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

  const isEmptyIndex = (word)=>  //return index of empty space to reserve for a new inst.
  {
      
      if(word == null || word == undefined || word == '' || word == ' ' || word == 0)
      {
          return true;

      }
      
      return false;
  }
  const haveItsOperands = (instruction) =>  //check if there operands to begin execute //usage : in execute
  {
      let flag = false;
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
              flag = isEmptyIndex(StoreBuffer.getQ(index));
          }
          else if(operation == 'MUL.D'  || operation == 'DIV.D')
          {
              flag = isEmptyIndex(MulDiv.getQj(index))  &&  isEmptyIndex(MulDiv.getQk(index));
          }
          else if(operation == 'ADD.D' || operation == 'SUB.D')
          {
              flag = isEmptyIndex(AddSub.getQj(index)) &&  isEmptyIndex(AddSub.getQk(index));
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
        //LoadBuffer.addROOM(InstructionFile.getAddress(instruction))
        console.log('add:',InstructionFile.getAddress(instruction))
        index = LoadBuffer.addROOM(InstructionFile.getAddress(instruction))
        InstructionFile.instructions[InstTurn].reservedRomm = 'L'+(index+1)
      }
      else if(operation == 'S.D')
      {
        if(isEmpty(RegisterFile.getQi(InstructionFile.getDestinationByInst(instruction))))
          Vj = RegisterFile.getContent(InstructionFile.getDestinationByInst(instruction));
        else     
          Qj = RegisterFile.getQi(InstructionFile.getDestinationByInst(instruction));
        index = StoreBuffer.addROOM(InstructionFile.getAddress(instruction),Vj,Qj); 
        InstructionFile.instructions[InstTurn].reservedRomm = 'S'+(index+1)

      } 
      else if(operation == 'MUL.D'  || operation == 'DIV.D')
      {     
        console.log('in issue',RegisterFile.getQi(InstructionFile.getFirstSourcenByInst(instruction)))
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
        if(operation != 'S.D')
          RegisterFile.setQi(InstructionFile.getDestinationByInst(instruction), InstructionFile.instructions[InstTurn].reservedRomm)
         InstTurn++;
      }
     // RegisterFile.setContent(InstructionFile.getDestinationByInst(instruction))
  }
}
const Execute = (instruction)=>
{
    const operation = InstructionFile.getOperationByInst(instruction);
    console.log('haveItsOperands',haveItsOperands(instruction))
    if(parseInt(instruction.Issue) != -1 && parseInt(instruction.Execute) == -1 && haveItsOperands(instruction) && parseInt(instruction.Issue) != CycleNo)
    {
        console.log('in Execute',instruction.instruction)
        let end = -1;
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

  if(instruction.ExecuteFinish == CycleNo) {
        console.log('in FinishExecute')
        let FirstOperand;
        let SecondOperand;
        let result;
        const operation = InstructionFile.getOperationByInst(instruction);
        let reservedRomm = instruction.reservedRomm;
        let place = reservedRomm.substring(1);
        let index = parseInt(place)-1;
        if(operation == 'L.D') //L.D F5,100
        {
          result = MemoryFile.getContent(parseInt(InstructionFile.getAddress(instruction)));
        }
        else if(operation == 'S.D')  //S.D F5,100
        {
          result = RegisterFile.getContent(InstructionFile.getDestinationByInst(instruction))
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
        bus.push({Result : result , Instruction : instruction.index})
    }
}
const getResult = (instructionIndex)=>
{
  for(let i = 0; i < bus.length; i++)
  {
    if(bus[i].Instruction == instructionIndex)
    {
      return bus[i].Result
    }
  }
  return -1;
}
const WriteResult = (instruction)=>
{
  let flag = false;
  if(parseInt(instruction.ExecuteFinish) < CycleNo && instruction.Issue != '-1' && instruction.Execute != '-1' &&  CycleNo > instruction.Issue && CycleNo > instruction.Execute && instruction.Write_Result == '-1')
  {
    flag = true;
    InstructionFile.instructions[instruction.index].Write_Result = CycleNo;
    const operation = InstructionFile.getOperationByInst(instruction);
    let reservedRomm = instruction.reservedRomm;
    let place = reservedRomm.substring(1);
    let ResIndex = parseInt(place)-1;
    const result = getResult(instruction.index);
    console.log('clock:',CycleNo,' RESULT:',result)
    //Q -> V or V = result
      for(let i =0;i < StoreBuffer.storeBuffer.length;i++)
      {
          if(StoreBuffer.storeBuffer[i].V == instruction.reservedRomm)
          {
            StoreBuffer.storeBuffer[i].V = result;
          }
          if(StoreBuffer.storeBuffer[i].Q == instruction.reservedRomm)
          {
            StoreBuffer.storeBuffer[i].Q = result;
          }
      }
      for(let i =0;i < AddSub.reservationStations.length;i++)
      {
        if(AddSub.reservationStations[i].Vj == instruction.reservedRomm)
        {
          AddSub.reservationStations[i].Vj = result;
        }
        if(AddSub.reservationStations[i].Qj == instruction.reservedRomm)
        {
          AddSub.reservationStations[i].Qj = result;
        }
        if(AddSub.reservationStations[i].Vk == instruction.reservedRomm)
        {
          AddSub.reservationStations[i].Vk = result;
        }
        if(AddSub.reservationStations[i].Qk == instruction.reservedRomm)
        {
          AddSub.reservationStations[i].Qk = result;
        }
    
    }
    for(let i =0;i < MulDiv.reservationStations.length;i++)
      {
        if(MulDiv.reservationStations[i].Vj == instruction.reservedRomm)
        {
          MulDiv.reservationStations[i].Vj = result;
        }
        if(MulDiv.reservationStations[i].Qj == instruction.reservedRomm)
        {
          MulDiv.reservationStations[i].Qj = result;
        }
        if(MulDiv.reservationStations[i].Vk == instruction.reservedRomm)
        {
          MulDiv.reservationStations[i].Vk = result;
        }
        if(MulDiv.reservationStations[i].Qk == instruction.reservedRomm)
        {
          MulDiv.reservationStations[i].Qk = result;
        }
    
    }
  // Ri.qi = 0 && Ri.content = result
    if(operation == 'S.D')
    {
      MemoryFile.setContent(InstructionFile.getAddress(instruction),result)
    }
    RegisterFile.setQi(InstructionFile.getDestinationByInst(instruction),null);
    RegisterFile.setContent(InstructionFile.getDestinationByInst(instruction),result);

  //Erease Res Stations

  if(operation == 'L.D') //L.D F5,100
  {
      LoadBuffer.deleteRoom(ResIndex);
  }
  else if(operation == 'S.D')  //S.D F5,100
  {
      StoreBuffer.deleteRoom(ResIndex);

  }
  else if(operation == 'MUL.D' || operation == 'DIV.D')
  {
    MulDiv.deleteRoom(ResIndex);
  }
  else if(operation == 'ADD.D' || operation == 'SUB.D')
  {
    AddSub.deleteRoom(ResIndex);
  }
  }
   
}
const AllFinsh = ()=>{
  let finish = 0;
  for(let i = 0; i < InstructionFile.NumberOfInst; i++)
  {
    if( InstructionFile.instructions[i].Write_Result != '-1')
      finish++;
  }
  if(finish == InstructionFile.NumberOfInst)
    return true
  else
    return false;
}
const Next = ()=>{
  if(AllFinsh() == true)
    return;
  console.log('cycle number:',CycleNo)
  console.log('InstructionFile:',InstructionFile)
  console.log('RegisterFile:',RegisterFile);
  console.log('MulDiv:',MulDiv);
  console.log('AddSub:',AddSub);
  console.log('LoadBuffer:',LoadBuffer);
  console.log('StoreBuffer:',StoreBuffer);
  console.log('Memory:',MemoryFile);
  const instruction = InstructionFile.instructions[InstTurn];
  console.log('InstTurn:',instruction)
  
  if(instruction != undefined && InstTurn < InstructionFile.NumberOfInst){
    Issue(instruction);
}
  console.log('BUS',bus)
  for(let i = 0; i < InstructionFile.NumberOfInst; i++)
  {
    if(InstructionFile.instructions[i].Issue != '-1'){
    console.log('NextEX',InstructionFile.instructions[i]);
    Execute(InstructionFile.instructions[i]);
    FinishExecute(InstructionFile.instructions[i]);}
  }
  for(let i = 0; i < InstructionFile.NumberOfInst; i++)
  {
    if(WriteResult(InstructionFile.instructions[i]))
        break;
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
        {/* MulDiv : {MulDiv.reservationStations} */}
        <br/>
        RegisterFile : {RegisterFile.RegisterFile}
        <br/>
        {/* AddSub : {AddSub.reservationStations} */}
        <br/>
        LoadBuffer : {LoadBuffer.LoadBuffer}
        <br/>
        StoreBuffer : {StoreBuffer.StoreBuffer}
 
        </>
        );

        
  }


export default Controller;