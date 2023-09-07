import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from "bcrypt";

const saltRounds : number = 10;

export const POST = async (req : Request) => {
    const { email,password,name,confirm } = await req.json();

    try {
      //check if user exists in database
      const findUser = await prisma.user.findUnique({
         where: {
            email:email 
         }
      });
      if(findUser) {
        return NextResponse.json({ message:"account is already exists" }  , { status:400 });
      }

      //check if password match with confirm
      if(password !== confirm) {
        return NextResponse.json({ message:"Password is not match" }  , { status:400 });
      }  

      //hash password
      const salt : string = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password,salt);
      const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password:hashPassword,
            provider:"credentials"
        }
      });
      if(createUser){
        return NextResponse.json({ message:"Registration successfully... wait for redirected" }  , { status:200 });
      }
 
    } catch(err : any) {
       return NextResponse.json({ message:"Internal Server Error" }, { status:500 });
    }
}

