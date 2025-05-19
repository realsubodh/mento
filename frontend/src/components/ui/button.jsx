export function Button ({label, onClick}){
return <button type="button" onClick={onClick} className="bg-black h-16 w-24 rounded-full text-white text-[18px] font-semibold cursor-pointer " >
{label}
</button>
}