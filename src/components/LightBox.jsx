export default function LightBox({contents, close}){
    return (
        <section className="bg-black text-white fixed bg-opacity-80 z-50 w-full h-full flex items-center justify-center">
            <span onClick={close} className="z-20 cursor-pointer select-none absolute text-sm underline right-2 top-2 p-4">close</span>
            <div className="z-10">{contents}</div>
            <div className="absolute flex w-full h-full items-center justify-center text-sm"><span>loading</span></div>
        </section>
    )
}

/* max height */