// import React from 'react';

// const Loader = () => {
//   return (
//     <>
//       <style>{`
//         /* Container styling */
//         .center-screen {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh; /* Full height of the viewport */
//           width: 100vw; /* Full width of the viewport */
//           background-color: #f0f0f0; /* Optional background color */
//         }

//         .wave-menu {
//           border: 4px solid #545FE5;
//           border-radius: 50px;
//           width: 200px;
//           height: 45px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 0;
//           margin: 0;
//           cursor: pointer;
//           transition: ease 0.2s;
//           position: relative;
//           background: #fff;
//         }

//         .wave-menu li {
//           list-style: none;
//           height: 30px;
//           width: 4px;
//           border-radius: 10px;
//           background: #545FE5;
//           margin: 0 6px;
//           padding: 0;
//           animation-name: wave1;
//           animation-duration: 0.3s;
//           animation-iteration-count: infinite;
//           animation-direction: alternate;
//           transition: ease 0.2s;
//         }

//         .wave-menu:hover > li {
//           background: #fff;
//         }

//         .wave-menu:hover {
//           background: #545FE5;
//         }

//         /* Individual bar animations */
//         .wave-menu li:nth-child(2) {
//           animation-name: wave2;
//           animation-delay: 0.2s;
//         }

//         .wave-menu li:nth-child(3) {
//           animation-name: wave3;
//           animation-delay: 0.23s;
//           animation-duration: 0.4s;
//         }

//         .wave-menu li:nth-child(4) {
//           animation-name: wave4;
//           animation-delay: 0.1s;
//           animation-duration: 0.3s;
//         }

//         .wave-menu li:nth-child(5) {
//           animation-delay: 0.5s;
//         }

//         .wave-menu li:nth-child(6) {
//           animation-name: wave2;
//           animation-duration: 0.5s;
//         }

//         .wave-menu li:nth-child(8) {
//           animation-name: wave4;
//           animation-delay: 0.4s;
//           animation-duration: 0.25s;
//         }

//         .wave-menu li:nth-child(9) {
//           animation-name: wave3;
//           animation-delay: 0.15s;
//         }

//         /* Keyframe animations */
//         @keyframes wave1 {
//           from {
//             transform: scaleY(1);
//           }
//           to {
//             transform: scaleY(0.5);
//           }
//         }

//         @keyframes wave2 {
//           from {
//             transform: scaleY(0.3);
//           }
//           to {
//             transform: scaleY(0.6);
//           }
//         }

//         @keyframes wave3 {
//           from {
//             transform: scaleY(0.6);
//           }
//           to {
//             transform: scaleY(0.8);
//           }
//         }

//         @keyframes wave4 {
//           from {
//             transform: scaleY(0.2);
//           }
//           to {
//             transform: scaleY(0.5);
//           }
//         }
//       `}</style>

//       <div className="center-screen">
//         <ul className="wave-menu">
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Loader;


import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-transparent">
      <ul className="border-4 border-indigo-600 rounded-full w-52 h-11 flex justify-center items-center p-0 m-0 bg-white cursor-pointer transition ease-in-out duration-200 relative">
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave1 transition ease-in-out duration-200"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave2 transition ease-in-out duration-200 delay-200"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave3 transition ease-in-out duration-200 delay-230"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave4 transition ease-in-out duration-200 delay-100"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 transition ease-in-out duration-200 delay-500"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave2 transition ease-in-out duration-200 delay-500"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave4 transition ease-in-out duration-200 delay-400"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1 animate-wave3 transition ease-in-out duration-200 delay-150"></li>
        <li className="list-none h-7 w-1 rounded-lg bg-indigo-600 mx-1"></li>
      </ul>
    </div>
  );
};

export default Loader;
