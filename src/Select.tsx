import React, {useState,useEffect,useRef } from 'react';
import style from "./select.module.css"
import { SelectOptions, SelectProps } from './Types';

export default function Select({multiple, options,value,onChange}:SelectProps) {
    const [isOpen,setIsOpen]=useState(false)
    const [highlightedIndex,setHighlightedIndex]=useState(0)
    const containerRef=useRef<HTMLDivElement>(null)
    function clearOptions(){
     multiple?  onChange([]):onChange(undefined)
    }
    function selectOptions(option:SelectOptions){
        if (multiple) {
            if(value.includes(option)) {onChange(value.filter(o=>o!=option))}else {
                onChange([...value,option])  
            }
        }else {
             if(value!==option)    onChange(option)
        }
    
    }
    function isOptionSelected(option:SelectOptions){
        return multiple? value.includes(option):option===value
    }
    useEffect(()=>{
        if(isOpen){
            setHighlightedIndex(0)
        }
    },[isOpen])
    useEffect(()=>{
       const handle=(e:KeyboardEvent)=>{
        if(e.target!==containerRef.current) return 
        switch(e.code){
            case "Enter":
                case "Space":
                    setIsOpen(prev=>!prev)
                    if(isOpen) selectOptions(options[highlightedIndex])
                    break
                    case "ArrowUp":
                        case "ArrowDown":
                            if(!isOpen){
                                setIsOpen(true); break
                            }
                            const newValue=highlightedIndex+(e.code==="ArrowDown"?1:-1)
                            if(newValue>=0&&newValue<<options.length){
                                setHighlightedIndex(newValue)
                            }
                            break
                            case "Escape":
                                setIsOpen(false);
                                break

        }
       }
       containerRef.current?.addEventListener("keydown",handle)

       return ()=>{
        containerRef?.current?.removeEventListener("keydown",handle)

       }
    },[isOpen,highlightedIndex])
  return (
    <div
    ref={containerRef}
    onBlur={()=>setIsOpen(false)}
    onClick={()=>setIsOpen(pr=>!pr)}
    tabIndex={0}
    className={style.container}
  >
    <span className={style.value}>
     {multiple?value.map(val=>{
        return <button className={style["option-bage"]} key={val.value} onClick={e=>{
            e.stopPropagation()
            selectOptions(val)
        }}>{val.label}
        <span className={style["remove-btn"]}>&times;</span>
        </button>
     }): value?.label}
    </span>
    <button
        onClick={e=>{
            e.stopPropagation()
            clearOptions()
        }}
      className={style["clear-btn"]}
    >
      &times;
    </button>
    <div className={style.divider}></div>
    <div className={style.caret}></div>
    <ul className={`${style.options} ${isOpen?style.show:""}`} >
      {options.map((option, index) => (
        <li
        onClick={e=>{
            e.stopPropagation()
            selectOptions(option)
            setIsOpen(false)
        }}
        onMouseEnter={()=>setHighlightedIndex(index)}
          key={option.value}
          className={`${style.option} ${isOptionSelected(option)?style.selected:""}
          ${index===highlightedIndex?style.highlighted:""}
          `}
        >
          {option.label}
        </li>
      ))}
    </ul>
  </div>
  
  );
}
