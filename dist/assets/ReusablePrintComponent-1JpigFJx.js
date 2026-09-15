const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-DLySjcMx.js","assets/rolldown-runtime-B0Z9INg1.js","assets/typeof-B5XbjTb1.js","assets/index-0KIBI1OQ.js","assets/jsx-runtime-CF4O39kz.js","assets/js.cookie-LuQ0sRX_.js","assets/redux-toolkit.modern-CBjLsB4G.js","assets/apiSlice-CLno64QQ.js","assets/index-BWTMcaEg.css"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{n as t,t as n}from"./jsx-runtime-CF4O39kz.js";import{st as r}from"./index-0KIBI1OQ.js";import{n as i}from"./format-C6ofl9SB.js";import{t as a}from"./lib-Df9ovD2Y.js";var o=e(t(),1),s=({title:e,columns:t,data:n,fileName:a,setPdfButtonClick:s})=>{(0,o.useEffect)(()=>{n&&Array.isArray(n)?l(n):(console.error(`No valid data to generate PDF.`),s(!1))},[n]);let c=e=>new Promise((t,n)=>{let r=new Image;r.crossOrigin=`anonymous`,r.src=e,r.onload=()=>{let e=document.createElement(`canvas`);e.width=r.width,e.height=r.height,e.getContext(`2d`).drawImage(r,0,0),t(e.toDataURL(`image/jpeg`))},r.onerror=e=>{n(e)}}),l=async n=>{try{let[{jsPDF:o},{default:s}]=await Promise.all([r(()=>import(`./jspdf.es.min-DLySjcMx.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8])),r(()=>import(`./jspdf.plugin.autotable-BrAqd2M3.js`),[])]),l=new o({orientation:`landscape`}),u=(l.internal.pageSize.getWidth()-l.getTextWidth(e))/2;l.setFontSize(18),l.text(e,u,20);let d=t.filter(e=>e.Header&&![`actions`,`serial`].includes(e.id)),f=d.map(e=>e.Header),p=n.map(e=>d.map(t=>{if(t.accessor===`date`||t.accessor===`created_at`||t.accessor===`updated_at`||t.accessor===`invoice_date`||t.accessor===`transaction_at`||t.accessor===`salary_date`||t.accessor===`increment_date`||t.accessor===`appointment_date`||t.accessor===`joining_date`||t.accessor===`birth_date`)return i(e[t.accessor]);if(t.accessor===`image_path`||t.accessor===`main_image`||t.accessor===`photo`||t.accessor===`main_image`)return{content:``,imageUrl:`https://stpos-server.stitbd.app/api`+e[t.accessor]};if(t.accessor&&typeof t.accessor==`string`){if(t.accessor.includes(`.`))return t.accessor.split(`.`).reduce((e,t)=>e?.[t],e)??``;let n=e[t.accessor];return typeof n==`boolean`?n?`Active`:`Inactive`:n??``}return``}));await s(l,{startY:30,head:[f],body:p,theme:`grid`,styles:{fontSize:8,cellPadding:3,valign:`middle`,halign:`center`,lineWidth:.1,lineColor:[0,0,0]},headStyles:{fillColor:[242,242,242],textColor:[0,0,0],fontStyle:`bold`,halign:`center`},alternateRowStyles:{fillColor:[249,249,249]},margin:{top:10,right:10,bottom:10,left:10},didDrawCell:async function(e){let t=e.column.index;if(d[t]?.accessor===`image_path`){let{imageUrl:t}=e.cell.raw||{};if(t)try{let n=await c(t);l.addImage(n,`JPEG`,e.cell.x+2,e.cell.y+2,16,16)}catch{console.warn(`Failed to load image:`,t)}}}}),l.save(a||`report.pdf`)}catch(e){console.error(`Error generating PDF:`,e)}finally{s(!1)}};return null},c=e(a(),1),l=n(),u=({title:e,columns:t,data:n,setPrintButtonClick:r})=>{let a=(0,o.useRef)(null),s=(0,c.useReactToPrint)({content:()=>a.current,removeAfterPrint:!0,onAfterPrint:()=>r(!1),onPrintError:e=>{console.error(`Print Error:`,e),r(!1)},pageStyle:`
            body {
                -webkit-print-color-adjust: exact;
                margin: 0;
                padding: 5px;
                font-family: 'Inter', sans-serif;
            }
            @page {
                size: auto;
                margin: 0mm;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                margin-top: 20px;
            }
            th, td {
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
            }
            th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
            h1 {
                text-align: center;
                margin-bottom: 20px;
                color: #333;
            }
        `});(0,o.useEffect)(()=>{Array.isArray(n)&&n.length>0?s():r(!1)},[n]);let u=(e,t)=>{if(!t)return``;if(t.includes(`.`))return t.split(`.`).reduce((e,t)=>e?.[t],e)??``;let n=e[t];return typeof n==`boolean`?n?`Active`:`Inactive`:n??``};return(0,l.jsx)(`div`,{className:`hidden`,children:(0,l.jsxs)(`div`,{ref:a,className:`p-5 text-gray-700`,children:[(0,l.jsx)(`h1`,{style:{fontSize:`22px`,fontWeight:700},children:e}),(0,l.jsxs)(`table`,{children:[(0,l.jsx)(`thead`,{children:(0,l.jsx)(`tr`,{children:t.filter(e=>e.Header&&![`actions`].includes(e.id)&&e.Header!==`Image`).map((e,t)=>(0,l.jsx)(`th`,{children:e.Header},`th-${t}`))})}),(0,l.jsx)(`tbody`,{children:n.map((e,n)=>(0,l.jsx)(`tr`,{children:t.filter(e=>e.Header&&![`actions`].includes(e.id)&&e.Header!==`Image`).map((t,r)=>(0,l.jsx)(`td`,{children:t.accessor===`image_path`||t.accessor===`photo`?(0,l.jsx)(`img`,{src:`https://stpos-server.stitbd.app/api${e[t.accessor]}`,alt:e.name,style:{width:`50px`,height:`50px`}}):t.accessor===`date`||t.accessor===`transaction_at`||t.accessor===`invoice_date`||t.accessor===`salary_date`||t.accessor===`created_at`||t.accessor===`updated_at`||t.accessor===`appointment_date`||t.accessor===`joining_date`||t.accessor===`increment_date`||t.accessor===`birth_date`?(0,l.jsx)(`span`,{children:i(u(e,t.accessor))}):t.accessor===`id`?n+1:u(e,t.accessor)},`td-${n}-${r}`))},n))})]})]})})};export{s as n,u as t};