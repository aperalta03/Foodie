import os
import json
from PIL import Image
import ffmpeg

#################################################
#como usar:
#un folder llamado recipes, adentro tiene q ver un folder con el titulo del recipe y adentro el archivo png y mov
#instala ffmpeg para windows pq eres ganso en linux fue un codigo nomas pa instalar en windows es una mierda creo no se ahi ve
#pip install Pillow ffmpeg-python
#python organize_recipes.py (para el run)
#ahi deje los folders con ejemplos 
#################################################

# Path to the input folder where the recipes folders are located
input_folder = "recipes"
output_folder = "recipes_output"
json_filename = "recipes.json"

# Function to format file names
def format_name(name):
    return name.lower().replace(" ", "_")

# Function to convert PNG to PDF
def convert_png_to_pdf(png_path, output_path):
    image = Image.open(png_path)
    pdf_path = output_path.replace(".png", ".pdf")
    image.save(pdf_path, "PDF")
    return pdf_path

# Function to convert MOV to MP4
def convert_mov_to_mp4(mov_path, output_path):
    mp4_path = output_path.replace(".mov", ".mp4")
    ffmpeg.input(mov_path).output(mp4_path).run(overwrite_output=True)
    return mp4_path

# Create output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Initialize an empty list to store the recipe information
recipes_data = []

# Iterate through each folder (which corresponds to a recipe) inside the input folder
for recipe_folder in os.listdir(input_folder):
    folder_path = os.path.join(input_folder, recipe_folder)
    
    if os.path.isdir(folder_path):
        # Extract recipe title from folder name and format it
        title = recipe_folder.replace("_", " ").title()
        formatted_title = format_name(recipe_folder)
        
        # Find the PDF (PNG in this case) and video (MOV) files in the folder
        pdf_file = None
        video_file = None
        
        for file in os.listdir(folder_path):
            if file.endswith(".png"):
                pdf_file = file
            elif file.endswith(".mov"):
                video_file = file
        
        # Check if both files were found
        if pdf_file and video_file:
            # Convert and rename the files
            pdf_src = os.path.join(folder_path, pdf_file)
            video_src = os.path.join(folder_path, video_file)
            
            # Convert PNG to PDF
            new_pdf_name = f"{formatted_title}.pdf"
            new_pdf_path = os.path.join(output_folder, formatted_title, new_pdf_name)
            os.makedirs(os.path.dirname(new_pdf_path), exist_ok=True)
            convert_png_to_pdf(pdf_src, new_pdf_path)
            
            # Convert MOV to MP4
            new_video_name = f"{formatted_title}.mp4"
            new_video_path = os.path.join(output_folder, formatted_title, new_video_name)
            convert_mov_to_mp4(video_src, new_video_path)
            
            # Add recipe data to the list
            recipes_data.append({
                "title": title,
                "description": "Description",
                "calories": "100 Calorias",
                "tags": ["Gluten Free", "Vegan", "Vegetarian"],
                "image": f"/recipes/{formatted_title}.png",
                "video": f"/recipes/{formatted_title}.mp4",
                "recipe": f"/recipes/{formatted_title}.pdf"
            })
        else:
            print(f"Warning: Missing PNG or MOV file for {recipe_folder}")

# Save the recipes data to a JSON file in the output folder
json_output_path = os.path.join(output_folder, json_filename)
with open(json_output_path, "w") as json_file:
    json.dump(recipes_data, json_file, indent=4)

print("Recipe folders processed and files converted successfully!")
