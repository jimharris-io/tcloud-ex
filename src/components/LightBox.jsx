export default function LightBox({contents, close}){
    return (
        <section className="bg-black text-white fixed bg-opacity-80 z-50 w-full h-full flex items-center justify-center" onClick={close}>
            <div>{contents}</div>
        </section>
    )
}