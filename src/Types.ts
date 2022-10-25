 export type SelectOptions={
    label:string,
    value:number
}
export type MultipleSelectProps={
    multiple:true,
    onChange:(value:SelectOptions[]|undefined)=>void,
    value:SelectOptions[]
}
export type SingleSelectProps={
    multiple?:false,
    onChange:(value:SelectOptions|undefined)=>void,
    value?:SelectOptions 
}
export type SelectProps={
    options:SelectOptions[],
}&(SingleSelectProps|MultipleSelectProps)