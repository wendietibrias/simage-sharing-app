import { NextResponse,NextRequest } from "next/server";
import authOptions from "@/lib/auth";
import prisma from "@/lib/prisma";

export const GET =  async (req : NextRequest) => {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const page = Number(searchParams.get("page"));
    const per_page = Number(searchParams.get("per_page"));
    const skippedPage = page === 1 ? 0 : per_page * (page-1);

    try {
        const findResultCount = await prisma.images.count();
        const maxPage = Math.ceil(findResultCount / Number(searchParams.get("per_page")));

        const findAllImage = await prisma.images.findMany({
            where: {
                title: {
                    contains: searchParams.get("search") as string
                }
            },
            take:Number(searchParams.get("per_page")),
            skip: skippedPage,
            orderBy:{
                created_at:"desc"
            }
        });

        return NextResponse.json({ 
            data:findAllImage,
            message:`${findAllImage.length} images from community found`,
            previousPage: page,
            maxPage:maxPage,
            nextPage: page < maxPage ? page + 1 : null,
        } , { status:200 });

    } catch(err : any) {
        return NextResponse.json({ message:"Internal Server Error" } , { status:500 });
    }
}