// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { removerFromPastes } from '../redux/pasteSlice';  // सही path दें


// const Paste = () => {
//   const pastes = useSelector((state) => state.paste.pastes)
//   console.log(pastes);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();

//   const filterData = pastes.filter(
//     (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())

//   )

//   function handleDelete(pasteId){
//     dispatch(removerFromPastes(pasteId));
//   }
//   return (
//     <div>
//       <input
//         className='p-2 rounded-2xl min-w-[600px] mt-5'
//         type="search"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className='flex flex-col gap-5 mt-5' >
//         {
//           filterData.length > 0 &&
//           filterData.map((paste) => {
//               return (
//                 <div className='border'>
//                   <div>
//                     {paste.title}
//                   </div>
//                   <div>
//                     {paste.content}
//                   </div>

//                   <div className='flex flex-row gap-4 place-content-evenly'>
//                     <button>
//                       Edit
//                     </button>
//                     <button>
//                       View
//                     </button>
//                     <button onClick={()=>handleDelete(paste?._id)}>
//                       Delete
//                     </button>
//                     <button>
//                       Copy
//                     </button>
//                     <button>

//                       Share
//                     </button>
//                   </div>

//                   <div>
//                 {paste.createdAt}
//                   </div>

//                 </div>
//               )
//             }

//           )
//         }

//       </div>
//     </div>
//   );
// };

// export default Paste;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';  // ✅ सही import किया
import toast from 'react-hot-toast';


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));  // ✅ अब सही से dispatch होगा
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 &&
          filterData.map((paste) => (
            <div key={paste._id} className="border"> {/* ✅ Key prop fix */}
              <div>{paste.title}</div>
              <div>{paste.content}</div>

              <div className="flex flex-row gap-4 place-content-evenly">
                <button>
                 
                    <a href={`/?pasteId=${paste?._id}`}>   Edit</a>
                 
                </button>

                <button>
                  <a href={`/pastes/${paste?._id}`} >
                    View
                  </a>
                </button>


                <button onClick={() => handleDelete(paste._id)}>Delete</button>

                <button onClick={() => {
                  navigator.clipboard.writeText
                  { paste?.content }
                  toast.success("copied to clipboard succescfully")
                }}>Copy</button>

                {/* home work : create share logic*/}
                <button>Share</button>
              </div>
              <div>

                {paste.createdAt}


              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;

