const ButtonDash = ({ label, color, onclick, icon }) => {
  return (
    <button
      className={`${color} rounded-sm flex justify-center items-center gap-2 cursor-pointer text-white px-3 py-1`}
      onClick={onclick}
    >
      <i className={icon}></i>
      {label}
    </button>
  )
}

export default ButtonDash
