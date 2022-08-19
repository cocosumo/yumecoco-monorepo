

export default function quotePulldown(target: string) {
  let val: string[] = [];
  if (target === 'tax') {
    val = Array.of('課税', '非課税');
  } else {
    val = ['あり', 'なし'];
  }

  return val;
}