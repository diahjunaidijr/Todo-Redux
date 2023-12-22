function ResponsiveTailwind() {
  return (
    <>
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden lg:max-w-2xl">
        <div className="lg:flex">
            <div className="lg:shrink-0">
                <img className="h-56 w-full object-cover md:h-full md:w-56" src="https://cdn2.vectorstock.com/i/1000x1000/54/81/cute-animal-friends-cartoon-vector-21595481.jpg"></img>
            </div>
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
                <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
                <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
            </div>
        </div>
        <div className="flex space-x-4">
                <p>Contoh horizontal space between children</p>
                <div className="bg-black text-white">01</div>
                <div className="bg-slate-500 text-white">02</div>
                <div className="bg-indigo-500 text-white">03</div>
            </div>
            <div className="flex flex-col space-y-4">
            <p>Contoh horizontal space between children</p>
                <div className="bg-black text-white">01</div>
                <div className="bg-slate-500 text-white">02</div>
                <div className="bg-indigo-500 text-white">03</div>
            </div>
            <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                <div className="bg-black text-white">01</div>
                <div className="bg-slate-500 text-white">02</div>
                <div className="bg-indigo-500 text-white">03</div>
            </div>
            <div className="flex -space-x-4">
                <div className="bg-black text-white">01</div>
                <div className="bg-slate-500 text-white">02</div>
                <div className="bg-indigo-500 text-white">03</div>
            </div>
            <div className="flow-root">
                <div className="-m-2 flex flex-wrap">
                    <div className="bg-black text-white">01</div>
                    <div className="bg-slate-500 text-white">02</div>
                    <div className="bg-indigo-500 text-white">03</div>
                </div>
            </div>
    </div>
       
    </>
  );
}

export default ResponsiveTailwind;
