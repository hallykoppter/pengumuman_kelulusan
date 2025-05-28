const ITextarea = ({ id, label, grow, defvalue, height }) => {
  return (
    <div className="flex flex-col p-1">
      <span className="text-md">{label}</span>
      <textarea
        className={height + " border-1 p-2 rounded-sm " + grow}
        id={id}
        name={id}
        defaultValue={defvalue}
        required
      />
    </div>
  )
}

export default ITextarea
