// Function to generate random DNA string for zombies
export function getRandomDNA(): string {
  // Create a random 16-digit hexadecimal string
  let dna = '';
  for (let i = 0; i < 16; i++) {
    dna += Math.floor(Math.random() * 16).toString(16);
  }
  return dna;
}

// Function to calculate zombie trait from specific DNA segments
export function getZombieTrait(dna: string, startIndex: number, modulo: number): number {
  if (startIndex + 2 > dna.length) {
    return 0;
  }
  
  const segment = dna.substring(startIndex, startIndex + 2);
  const value = parseInt(segment, 16);
  return value % modulo;
}

// Function to format date to a readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}