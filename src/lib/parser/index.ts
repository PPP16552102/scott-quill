function matter(input?: string | { content: string }, options: any) {
  if (input === '') return {
    data: {},
    content: input,
    excerpt: '',
    orig: input
  }

  
}

export default matter;