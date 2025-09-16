import Link from "next/link";
export default function TOC() {
 return (
   <ul>
     <li>
       <Link href="/Labs" id="wd-lab1-link">
         Home </Link> </li>
     <li>
       <Link href="/Labs" id="wd-lab1-link">
         Lab1 </Link> </li>    
     <li>
       <Link href="/Labs" id="wd-lab2-link">
         Lab2 </Link> </li>
     <li>
       <Link href="/Labs" id="wd-lab3-link">
         Lab3 </Link> </li>    
     <li>
       <Link href="/" id="wd-lab3-link">
         Kambaz </Link> </li>
   </ul>
);}
