import Card from '../../../components/Card'

export default (props) => {
  return <Card class="w-full h-[calc(50%-10px)]">{props.children}</Card>
}
