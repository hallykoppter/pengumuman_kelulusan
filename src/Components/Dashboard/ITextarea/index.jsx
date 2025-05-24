const ITextarea = ({ id, label, grow, defvalue }) => {
  return (
    <div className="flex flex-col p-1">
      <span className="text-md">{label}</span>
      <textarea
        className={"border-1 p-1 rounded-sm " + grow}
        id={id}
        name={id}
        defaultValue={defvalue}
      />
    </div>
  )
}

export default ITextarea
