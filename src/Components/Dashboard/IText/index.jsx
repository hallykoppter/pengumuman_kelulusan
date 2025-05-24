const IText = ({ type, id, label, onchange, defvalue }) => {
  return (
    <div className="flex flex-col p-1">
      <span className="text-md">{label}</span>
      <input
        type={type}
        id={id}
        name={id}
        className="border-1 w-80 p-1 px-3 rounded-sm"
        onChange={onchange}
        defaultValue={defvalue}
        autoComplete="off"
      />
    </div>
  )
}

export default IText
