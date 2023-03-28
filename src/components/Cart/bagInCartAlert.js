import Alert from 'react-bootstrap/Alert';

function BagInCartAlert() {
  return (
    <Alert variant="success">
      <Alert>Reserved!</Alert>
      <Alert.Link href="cart">click for cart</Alert.Link>
    </Alert>
  );
}

export default BagInCartAlert;