import Alert from 'react-bootstrap/Alert';


// 'primary',
// 'secondary',
// 'success',
// 'danger',
// 'warning',
// 'info',
// 'light',
// 'dark',


function AlertMessage({variant = 'primary', children}) {
  return (
    <Alert key={variant} variant={variant}>
        {children}
    </Alert>
  );
}

export default AlertMessage;