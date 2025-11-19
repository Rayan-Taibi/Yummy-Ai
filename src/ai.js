const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    
    console.log("API Key exists:", !!GROQ_API_KEY)
    console.log("Ingredients:", ingredientsString)
    
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: `You are a chef. Create a recipe using some or all of these ingredients: ${ingredientsString}. Format in markdown with a title, ingredients list, and instructions.`
                    }
                ],
                max_tokens: 1024
            })
        })
        
        console.log("Response status:", response.status)
        const data = await response.json()
        console.log("Response data:", data)
        
        if (!response.ok) {
            console.error("API Error:", data)
            return `Error: ${data.error?.message || 'Unknown error'}`
        }
        
        return data.choices[0].message.content
    } catch (err) {
        console.error("Full Error:", err)
        return "Error generating recipe."
    }
}