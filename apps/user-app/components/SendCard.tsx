"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export  function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
  return (
    <div className="h-[80vh] ">
      <Center>
        <div className="">

        <Card title="Send">
            <div className="min-w-72 pt-2">
            <TextInput label="Number" placeholder="Receiver's Number" onChange={(value)=>{
              setNumber(value)
            }}/>
            <TextInput label="Amount" placeholder="Amount in rupees" onChange={(value)=>{
              setAmount(value)
            }}/>
            <div className="flex justify-center pt-4">
            <Button onClick={async()=>{
              await p2pTransfer(number,Number(amount)*100)
            }}>Send</Button>
            </div>
            </div>
        </Card>
          </div>
      </Center>
    </div>
  )
}
