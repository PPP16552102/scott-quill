function matter(input?: string | { content: string }) {
  if (input === '') return {
    data: {},
    content: input,
    excerpt: '',
    orig: input
  }

  
}

export default matter;