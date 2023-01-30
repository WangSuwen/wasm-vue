<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import init, { greet } from '#/hello-wasm/pkg';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
	init();
	// TODO: 这里用 timeout 是因为wasm 包加载顺序的问题，这个不知道怎么处理
	setTimeout(() => {
		greet('Word!');
	}, 500);
  }
}
</script>
