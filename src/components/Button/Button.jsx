import './Button.css'

function Button({ as: Component = 'a', variant = 'primary', children, ...props }) {
  return (
    <Component className={`btn btn-${variant}`} {...props}>
      {children}
    </Component>
  )
}

export default Button
