import { getRandomDNA } from '../utils/zombieUtils';

// Helper for code validation (in a real app, this would be a proper Solidity validator)
const createBasicValidator = (requiredKeywords: string[]) => {
  return (code: string) => {
    const lowerCode = code.toLowerCase();
    return requiredKeywords.every(keyword => lowerCode.includes(keyword.toLowerCase()));
  };
};

export const lessons = [
  {
    id: 1,
    title: "Solidity: Variables & Types",
    shortDescription: "Learn the basics of Solidity programming language, including variables, data types, and functions.",
    introduction: "Welcome to CryptoZombies! In this lesson, you'll learn the fundamentals of Solidity, the programming language used to create smart contracts on Ethereum. We'll start by creating a simple contract to generate your first zombie.",
    chapter: "Chapter 1: Solidity Basics",
    duration: "30 min",
    initialCode: `pragma solidity ^0.8.0;

contract ZombieFactory {
    // Declare a uint variable named dnaDigits
    // and set it equal to 16
    
    // Start here
    
}`,
    contentBlocks: [
      {
        type: 'concept',
        title: 'State Variables & Integers',
        content: 'State variables are permanently stored in contract storage. This means they\'re written to the Ethereum blockchain.\n\nUint stands for unsigned integer, meaning a non-negative number. There\'s also int for signed integers.\n\nIn Solidity, uint is actually an alias for uint256, a 256-bit unsigned integer. You can declare uints with less bits: uint8, uint16, uint32, etc.'
      },
      {
        type: 'explanation',
        content: 'Our zombie DNA is going to be determined by a 16-digit number. Let\'s store this in a uint variable called dnaDigits.'
      },
      {
        type: 'code',
        content: `uint dnaDigits = 16;`
      },
      {
        type: 'note',
        content: 'In this lesson, we\'re focusing on syntax. Don\'t worry about how the DNA actually influences the zombie\'s appearance yet.'
      }
    ],
    validationFn: createBasicValidator(['uint', 'dnaDigits', '16']),
    expectedOutput: "Great job! You've successfully defined the dnaDigits variable. This will be used to determine the unique characteristics of your zombie."
  },
  {
    id: 2,
    title: "Solidity: Math Operations",
    shortDescription: "Learn how to use math operations in Solidity to create a DNA modulus.",
    introduction: "Now that we have our dnaDigits variable set to 16, let's learn how to use math operations in Solidity to calculate a DNA modulus that will determine our zombie's characteristics.",
    chapter: "Chapter 1: Solidity Basics",
    duration: "25 min",
    initialCode: `pragma solidity ^0.8.0;

contract ZombieFactory {
    uint dnaDigits = 16;
    
    // Create a uint variable named dnaModulus
    // Set it equal to 10 raised to the power of dnaDigits
    
    // Start here
    
}`,
    contentBlocks: [
      {
        type: 'concept',
        title: 'Math Operations in Solidity',
        content: 'Solidity supports basic math operations that you\'d expect:\n\n- Addition: x + y\n- Subtraction: x - y\n- Multiplication: x * y\n- Division: x / y\n- Modulus (remainder): x % y\n- Exponentiation: x ** y (x to the power of y)'
      },
      {
        type: 'explanation',
        content: 'To make sure our zombie\'s DNA is only 16 digits, let\'s create a modulus using 10^16. This will allow us to take the remainder when dividing by 10^16, giving us a number between 0 and 10^16 - 1.'
      },
      {
        type: 'code',
        content: `uint dnaModulus = 10 ** dnaDigits;`
      },
      {
        type: 'note',
        content: 'In Solidity, the expression 10 ** dnaDigits means 10 raised to the power of dnaDigits. With dnaDigits set to 16, this equals 10^16 or 10000000000000000.'
      }
    ],
    validationFn: createBasicValidator(['uint', 'dnaModulus', '10', '**', 'dnaDigits']),
    expectedOutput: "Excellent! You've created the dnaModulus variable. This will help us ensure that zombie DNA is always exactly 16 digits."
  },
  {
    id: 3,
    title: "Solidity: Structs",
    shortDescription: "Learn to create custom data types using Solidity structs to represent your zombies.",
    introduction: "Now let's create a way to store zombies in our app. We'll need a data structure to hold the various properties of each zombie, and for this we'll use a Struct.",
    chapter: "Chapter 1: Solidity Basics",
    duration: "40 min",
    initialCode: `pragma solidity ^0.8.0;

contract ZombieFactory {
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    
    // Create a struct named Zombie
    // Give it two properties: name (string) and dna (uint)
    
    // Start here
    
}`,
    contentBlocks: [
      {
        type: 'concept',
        title: 'Structs',
        content: 'Structs allow you to create more complex data types with multiple properties. They\'re useful for grouping related data together.\n\nThink of them like creating a new data type with specific fields - similar to classes in other languages but without methods.'
      },
      {
        type: 'code',
        title: 'Example of a Struct',
        content: `struct Person {
    uint age;
    string name;
}`
      },
      {
        type: 'explanation',
        content: 'For our zombie game, we need to track several properties for each zombie, at minimum their name and DNA. Let\'s create a Zombie struct to store this information.'
      },
      {
        type: 'note',
        content: 'In Solidity, string is used for arbitrary-length UTF-8 data. Strings are more costly in terms of gas than other data types, so be careful with their usage in production contracts.'
      }
    ],
    validationFn: createBasicValidator(['struct', 'Zombie', 'string', 'name', 'uint', 'dna']),
    expectedOutput: "Great work! You've created your Zombie struct with name and dna properties. Now we can start creating zombies with specific characteristics."
  },
  {
    id: 4,
    title: "Solidity: Arrays",
    shortDescription: "Learn to create and work with arrays to store a collection of zombies.",
    introduction: "Now that we have defined what a Zombie is using a struct, we'll need a way to store a collection of zombies. For this, we'll use an array.",
    chapter: "Chapter 1: Solidity Basics",
    duration: "35 min",
    initialCode: `pragma solidity ^0.8.0;

contract ZombieFactory {
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    
    struct Zombie {
        string name;
        uint dna;
    }
    
    // Create a public array of Zombie structs
    // Name it 'zombies'
    
    // Start here
    
}`,
    contentBlocks: [
      {
        type: 'concept',
        title: 'Arrays',
        content: 'When you want to create a collection of something, you can use an array. There are two types of arrays in Solidity:\n\n- Fixed arrays: Array with a fixed length\n  Example: uint[5] fixedArray; // Array of 5 uints\n\n- Dynamic arrays: Array that can grow or shrink in size\n  Example: uint[] dynamicArray; // Can change in size'
      },
      {
        type: 'concept',
        title: 'Public Arrays',
        content: 'You can declare an array as public, and Solidity will automatically create a getter for it. Other contracts will then be able to read (but not write) from this array.\n\nThis is useful for storing public data in your contract.'
      },
      {
        type: 'explanation',
        content: 'Let\'s create a public array of Zombie structs. This will be a dynamic array since we\'ll be adding zombies to it over time.'
      },
      {
        type: 'code',
        content: `Zombie[] public zombies;`
      }
    ],
    validationFn: createBasicValidator(['Zombie[]', 'public', 'zombies']),
    expectedOutput: "Awesome job! You've created a public array to store zombies. This array will hold all the zombies created in our game."
  },
  {
    id: 5,
    title: "Solidity: Functions",
    shortDescription: "Learn to create and use functions to create new zombies in your army.",
    introduction: "Now that we have our Zombie struct and an array to store them, let's create a function to create new zombies and add them to our array.",
    chapter: "Chapter 2: Functions & Events",
    duration: "45 min",
    initialCode: `pragma solidity ^0.8.0;

contract ZombieFactory {
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    
    struct Zombie {
        string name;
        uint dna;
    }
    
    Zombie[] public zombies;
    
    // Create a function named 'createZombie'
    // It should take two parameters: _name (string) and _dna (uint)
    // Make it public
    // Don't worry about the function body yet
    
    // Start here
    
}`,
    contentBlocks: [
      {
        type: 'concept',
        title: 'Function Declarations',
        content: 'A function declaration in Solidity looks like this:\n\nfunction functionName(parameter1Type parameter1Name, parameter2Type parameter2Name) public|private|internal|external returns(returnType) {\n    // function body\n}'
      },
      {
        type: 'concept',
        title: 'Function Parameters & Private',
        content: 'It\'s convention to start parameter variable names with an underscore (_) to distinguish them from global variables.\n\nFunction visibility can be:\n- public: Can be called from anywhere\n- private: Only callable from within the current contract\n- internal: Only callable from within the current contract and any derived contracts\n- external: Only callable from outside the contract'
      },
      {
        type: 'explanation',
        content: 'We need to create a function that will create new zombies. This function should take a name and DNA value as parameters and add a new Zombie to our zombies array.'
      },
      {
        type: 'code',
        content: `function createZombie(string memory _name, uint _dna) public {
    // Function body will be added later
}`
      },
      {
        type: 'note',
        content: 'The memory keyword is required for all reference types such as arrays, structs, mappings, and strings. It specifies where the value should be stored during execution.'
      }
    ],
    validationFn: createBasicValidator(['function', 'createZombie', 'string', 'memory', '_name', 'uint', '_dna', 'public']),
    expectedOutput: "Perfect! You've created the function signature for createZombie. Next, we'll implement the function body to actually create and store zombies."
  },
  {
    id: 6,
    title: "Solidity: Working with Structs & Arrays",
    shortDescription: "Learn how to create new structs and add them to arrays.",
    introduction: "Now that we have our createZombie function declared, let's implement its body to create new zombies and add them to our array.",
    chapter: "Chapter 2: Functions & Events",
    duration: "40 min",
    initialCode: `pragma solidity ^0.8.0;

contract ZombieFactory {
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    
    struct Zombie {
        string name;
        uint dna;
    }
    
    Zombie[] public zombies;
    
    function createZombie(string memory _name, uint _dna) public {
        // Add a new Zombie to the zombies array with the provided name and dna
        // Don't forget to use the dnaModulus to ensure DNA is only 16 digits
        
        // Start here
        
    }
}`,
    contentBlocks: [
      {
        type: 'concept',
        title: 'Creating New Structs',
        content: 'You can create a new struct in one of two ways:\n\n1. Create a new variable and then set its properties:\n   Zombie zombie = Zombie({\n     name: "Zombie #1",\n     dna: 1234\n   });\n\n2. Create and initialize directly:\n   zombies.push(Zombie(_name, _dna));'
      },
      {
        type: 'explanation',
        content: 'We need to create a new Zombie struct with the given name and DNA, and add it to our zombies array. Remember to use dnaModulus to ensure the DNA is the right length.'
      },
      {
        type: 'code',
        content: `zombies.push(Zombie(_name, _dna % dnaModulus));`
      },
      {
        type: 'note',
        content: 'The % operator (modulus) ensures that if _dna is longer than 16 digits, it will only use the last 16 digits. This gives us a DNA value between 0 and 10^16 - 1.'
      }
    ],
    validationFn: createBasicValidator(['zombies.push', 'Zombie', '_name', '_dna', 'dnaModulus']),
    expectedOutput: "Excellent work! Your createZombie function now properly creates zombies and adds them to your army. You now have the basic functionality needed to create and store zombies."
  }
];