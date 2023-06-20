#I hope to change this where it is more 
#advanced in extracting math equations/formulas

import PyPDF2
import regex as re
import csv

from PyPDF2 import PdfReader


# def extract_text_from_pdf(pdf_path):
#     with open(pdf_path, 'rb') as file:
#         reader = PyPDF2.PdfReader(file)
#         text = ''
#         for page in range(len(reader.pages)):
#             text += reader.pages[page].extract_text()
#     return text

def preprocess_text(text):
    cleaned_text = text.replace('\n', ' ')
    cleaned_text = cleaned_text.replace('\x00', '')
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
    return cleaned_text


def extract_formulas_and_words(text):
    # formulas = re.findall(r'\$.*?\$', text)
    # words = re.findall(r'\b\w+\b', text)
    words = re.split(r'\n\s*\n', text.strip())
    return words

def convert_pdf_to_csv(pdf_path, csv_path): #done in place
    reader = PyPDF2.PdfReader(pdf_path)
                    
    with open(csv_path, 'w', newline='') as file:
        writer = csv.writer(file, delimiter='⌘')
        writer.writerow(['Chapter', 'Page', 'Text'])
        
    # getting a specific page from the pdf file
        for page in range(len(reader.pages)):
            # extracting text from page
            text = reader.pages[page].extract_text()
            cleaned_text = preprocess_text(text)
            words = extract_formulas_and_words(cleaned_text)
            writer.writerow([i]+[page] + list(words))






