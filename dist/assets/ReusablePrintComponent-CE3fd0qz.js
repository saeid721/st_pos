import{n as e,s as t,t as n}from"./jsx-runtime-CF72uaaz.js";import{n as r}from"./format-DDsj5ikn.js";import{t as i}from"./lib-DMvBByYX.js";var a=t(e(),1),o=({title:e,columns:t,data:n,fileName:i,setPdfButtonClick:o})=>{(0,a.useEffect)(()=>{n&&Array.isArray(n)?c(n):(console.error(`No valid data to generate PDF.`),o(!1))},[n]);let s=e=>new Promise((t,n)=>{let r=new Image;r.crossOrigin=`anonymous`,r.src=e,r.onload=()=>{let e=document.createElement(`canvas`);e.width=r.width,e.height=r.height,e.getContext(`2d`).drawImage(r,0,0),t(e.toDataURL(`image/jpeg`))},r.onerror=e=>{n(e)}}),c=async n=>{try{let a=new jsPDF({orientation:`landscape`}),o=(a.internal.pageSize.getWidth()-a.getTextWidth(e))/2;a.setFontSize(18),a.text(e,o,20);let c=t.filter(e=>e.Header&&![`actions`,`serial`].includes(e.id)),l=c.map(e=>e.Header),u=n.map(e=>c.map(t=>{if(t.accessor===`date`||t.accessor===`created_at`||t.accessor===`updated_at`||t.accessor===`invoice_date`||t.accessor===`transaction_at`||t.accessor===`salary_date`||t.accessor===`increment_date`||t.accessor===`appointment_date`||t.accessor===`joining_date`||t.accessor===`birth_date`)return r(e[t.accessor]);if(t.accessor===`image_path`||t.accessor===`main_image`||t.accessor===`photo`||t.accessor===`main_image`)return{content:``,imageUrl:`https://stpos-server.stitbd.app/api`+e[t.accessor]};if(t.accessor&&typeof t.accessor==`string`){if(t.accessor.includes(`.`))return t.accessor.split(`.`).reduce((e,t)=>e?.[t],e)??``;let n=e[t.accessor];return typeof n==`boolean`?n?`Active`:`Inactive`:n??``}return``}));await autoTable(a,{startY:30,head:[l],body:u,theme:`grid`,styles:{fontSize:8,cellPadding:3,valign:`middle`,halign:`center`,lineWidth:.1,lineColor:[0,0,0]},headStyles:{fillColor:[242,242,242],textColor:[0,0,0],fontStyle:`bold`,halign:`center`},alternateRowStyles:{fillColor:[249,249,249]},margin:{top:10,right:10,bottom:10,left:10},didDrawCell:async function(e){let t=e.column.index;if(c[t]?.accessor===`image_path`){let{imageUrl:t}=e.cell.raw||{};if(t)try{let n=await s(t);a.addImage(n,`JPEG`,e.cell.x+2,e.cell.y+2,16,16)}catch{console.warn(`Failed to load image:`,t)}}}}),a.save(i||`report.pdf`)}catch(e){console.error(`Error generating PDF:`,e)}finally{o(!1)}};return null},s=t(i(),1),c=n(),l=({title:e,columns:t,data:n,setPrintButtonClick:i})=>{let o=(0,a.useRef)(null),l=(0,s.useReactToPrint)({content:()=>o.current,removeAfterPrint:!0,onAfterPrint:()=>i(!1),onPrintError:e=>{console.error(`Print Error:`,e),i(!1)},pageStyle:`
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
        `});(0,a.useEffect)(()=>{Array.isArray(n)&&n.length>0?l():i(!1)},[n]);let u=(e,t)=>{if(!t)return``;if(t.includes(`.`))return t.split(`.`).reduce((e,t)=>e?.[t],e)??``;let n=e[t];return typeof n==`boolean`?n?`Active`:`Inactive`:n??``};return(0,c.jsx)(`div`,{className:`hidden`,children:(0,c.jsxs)(`div`,{ref:o,className:`p-5 text-gray-700`,children:[(0,c.jsx)(`h1`,{style:{fontSize:`22px`,fontWeight:700},children:e}),(0,c.jsxs)(`table`,{children:[(0,c.jsx)(`thead`,{children:(0,c.jsx)(`tr`,{children:t.filter(e=>e.Header&&![`actions`].includes(e.id)&&e.Header!==`Image`).map((e,t)=>(0,c.jsx)(`th`,{children:e.Header},`th-${t}`))})}),(0,c.jsx)(`tbody`,{children:n.map((e,n)=>(0,c.jsx)(`tr`,{children:t.filter(e=>e.Header&&![`actions`].includes(e.id)&&e.Header!==`Image`).map((t,i)=>(0,c.jsx)(`td`,{children:t.accessor===`image_path`||t.accessor===`photo`?(0,c.jsx)(`img`,{src:`https://stpos-server.stitbd.app/api${e[t.accessor]}`,alt:e.name,style:{width:`50px`,height:`50px`}}):t.accessor===`date`||t.accessor===`transaction_at`||t.accessor===`invoice_date`||t.accessor===`salary_date`||t.accessor===`created_at`||t.accessor===`updated_at`||t.accessor===`appointment_date`||t.accessor===`joining_date`||t.accessor===`increment_date`||t.accessor===`birth_date`?(0,c.jsx)(`span`,{children:r(u(e,t.accessor))}):t.accessor===`id`?n+1:u(e,t.accessor)},`td-${n}-${i}`))},n))})]})]})})};export{o as n,l as t};